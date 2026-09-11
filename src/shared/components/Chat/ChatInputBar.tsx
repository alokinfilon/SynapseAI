import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Keyboard,
  Platform,
  PermissionsAndroid,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  AudioIcon,
  CameraIcon,
  PlusIcon,
  SendArrowIcon,
} from '../../../../assets/svg';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker, { types } from 'react-native-document-picker';
import { useTheme } from '../../../hooks';
import WebSpeechBridge, { WebSpeechBridgeRef } from './WebSpeechBridge';
import VoiceRecordingModal from './modals/VoiceRecordingModal';
import CameraCaptureModal from './modals/CameraCaptureModal';
import DocumentPickerModal from './modals/DocumentPickerModal';
import AttachmentPreviewTray, { PendingAttachmentItem } from './subcomponents/AttachmentPreviewTray';
import AttachmentMenuPopover from './subcomponents/AttachmentMenuPopover';
import ChatSuggestionsRow from './subcomponents/ChatSuggestionsRow';

export type { PendingAttachmentItem };

export interface ChatInputBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onSend?: (text: string) => void;
  onSendImage?: (imageUrl: string | string[], caption?: string) => void;
  onAudioPress?: () => void;
  onCameraPress?: () => void;
  onAttachmentSelect?: (type: 'document' | 'camera' | 'video' | 'gallery' | string) => void;
  suggestions?: string[];
  onSelectSuggestion?: (suggestion: string) => void;
  placeholder?: string;
  style?: ViewStyle;
}

export const ChatInputBar: React.FC<ChatInputBarProps> = ({
  value: externalValue,
  onChangeText: externalOnChangeText,
  onSend,
  onSendImage,
  onAudioPress,
  onCameraPress,
  onAttachmentSelect,
  suggestions,
  onSelectSuggestion,
  placeholder = 'Type a message to Lumi ...',
  style,
}) => {
  const theme = useTheme();
  const [internalValue, setInternalValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [pendingAttachments, setPendingAttachments] = useState<PendingAttachmentItem[]>([]);

  const handleRemoveAttachment = (id: string) => {
    setPendingAttachments((prev) => prev.filter((item) => item.id !== id));
  };

  // WebSpeech Engine state
  const [isListening, setIsListening] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [transcription, setTranscription] = useState('');
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const webSpeechRef = useRef<WebSpeechBridgeRef>(null);

  // Timer loop for recording duration
  useEffect(() => {
    if (isRecording) {
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);

  const value = externalValue !== undefined ? externalValue : internalValue;
  const hasText = value.trim().length > 0;

  // Pulse animation while mic is active
  useEffect(() => {
    if (isListening || isRecording) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.35,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      );
      pulse.start();
      return () => pulse.stop();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isListening, isRecording, pulseAnim]);

  const handleChangeText = (text: string) => {
    if (externalOnChangeText) {
      externalOnChangeText(text);
    } else {
      setInternalValue(text);
    }
  };

  const canSend = hasText || pendingAttachments.length > 0;

  const handleSend = () => {
    const textToSend = value.trim();
    if (!canSend) return;

    if (pendingAttachments.length > 0) {
      const imageItems = pendingAttachments.filter((item) => item.type === 'image' && item.uri);
      const otherItems = pendingAttachments.filter((item) => item.type !== 'image' || !item.uri);

      if (imageItems.length > 0) {
        const uris = imageItems.map((item) => item.uri!);
        onSendImage?.(uris.length === 1 ? uris[0] : uris, textToSend);
      }

      otherItems.forEach((item, index) => {
        const caption = imageItems.length === 0 && index === 0 ? textToSend : undefined;
        if (item.type === 'video') {
          onSendImage?.(item.uri || '', caption ? `🎥 ${item.name}\n${caption}` : `🎥 ${item.name}`);
        } else if (item.type === 'document') {
          onSend?.(caption ? `Attached Document: ${item.name}\n${caption}` : `Attached Document: ${item.name}`);
        }
      });

      setPendingAttachments([]);
      if (externalValue === undefined) {
        setInternalValue('');
      }
      Keyboard.dismiss();
      setShowAttachments(false);
      return;
    }

    if (textToSend) {
      Keyboard.dismiss();
      setShowAttachments(false);
      onSend?.(textToSend);
      if (externalValue === undefined) {
        setInternalValue('');
      }
    }
  };

  // Real Camera Capture & Gallery Selection
  const [showCameraModal, setShowCameraModal] = useState(false);
  const SAMPLE_PHOTOS = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
  ];
  const [selectedPhoto, setSelectedPhoto] = useState(SAMPLE_PHOTOS[0]);
  const [photoCaption, setPhotoCaption] = useState('');

  const handleCameraClick = async () => {
    if (onCameraPress) {
      onCameraPress();
      return;
    }
    Keyboard.dismiss();
    setShowAttachments(false);

    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'Synapse needs camera access to capture real photos for chat.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          setSelectedPhoto(SAMPLE_PHOTOS[Math.floor(Math.random() * SAMPLE_PHOTOS.length)]);
          setShowCameraModal(true);
          return;
        }
      } catch (err) {
        console.warn('Camera permission request error:', err);
      }
    }

    try {
      launchCamera(
        {
          mediaType: 'photo',
          quality: 0.8,
          cameraType: 'back',
        },
        (response) => {
          if (response.didCancel) {
            console.log('User cancelled camera capture');
          } else if (response.errorMessage || !response.assets || response.assets.length === 0) {
            console.warn('Camera Error/Unavailable: ', response?.errorMessage);
            setSelectedPhoto(SAMPLE_PHOTOS[Math.floor(Math.random() * SAMPLE_PHOTOS.length)]);
            setShowCameraModal(true);
          } else if (response.assets && response.assets.length > 0) {
            const capturedUri = response.assets[0].uri;
            if (capturedUri) {
              setPendingAttachments((prev) => [
                ...prev,
                {
                  id: `${Date.now()}_${Math.random()}`,
                  type: 'image',
                  uri: capturedUri,
                  name: 'Captured_Photo.jpg',
                },
              ]);
            }
          }
        },
      );
    } catch (e) {
      console.warn('launchCamera exception:', e);
      setSelectedPhoto(SAMPLE_PHOTOS[Math.floor(Math.random() * SAMPLE_PHOTOS.length)]);
      setShowCameraModal(true);
    }
  };

  const handleGalleryClick = async () => {
    Keyboard.dismiss();
    setShowAttachments(false);

    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 0,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled gallery picker');
        } else if (response.errorMessage) {
          console.warn('Gallery Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const newItems: PendingAttachmentItem[] = response.assets
            .filter((asset) => !!asset.uri)
            .map((asset, idx) => ({
              id: `${Date.now()}_${idx}_${Math.random()}`,
              type: 'image',
              uri: asset.uri,
              name: asset.fileName || `Photo_${idx + 1}.jpg`,
            }));
          setPendingAttachments((prev) => [...prev, ...newItems]);
        }
      },
    );
  };

  const handleVideoClick = async () => {
    Keyboard.dismiss();
    setShowAttachments(false);

    launchImageLibrary(
      {
        mediaType: 'video',
        quality: 0.8,
        selectionLimit: 1,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled video picker');
        } else if (response.errorMessage) {
          console.warn('Video Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const file = response.assets[0];
          const uri = file.uri;
          const fileName = file.fileName || 'Video_Clip.mp4';
          if (uri) {
            setPendingAttachments((prev) => [
              ...prev,
              {
                id: `${Date.now()}_${Math.random()}`,
                type: 'video',
                uri: uri,
                name: fileName,
              },
            ]);
          }
        }
      },
    );
  };

  // Document Modal State
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  const handleOpenNativeDocumentPicker = async () => {
    try {
      if (!DocumentPicker || typeof DocumentPicker.pick !== 'function') {
        throw new Error('RNDocumentPicker native module not linked in binary.');
      }

      const docTypes = types
        ? [
            types.pdf,
            types.doc,
            types.docx,
            types.xls,
            types.xlsx,
            types.plainText,
            types.csv,
            types.zip,
          ]
        : ['*/*'];

      const res = await DocumentPicker.pick({
        type: docTypes,
      });
      if (res && res.length > 0) {
        setShowDocumentModal(false);
        const newDocItems: PendingAttachmentItem[] = res.map((doc, idx) => ({
          id: `${Date.now()}_${idx}_${Math.random()}`,
          type: 'document',
          uri: doc.uri,
          name: doc.name || `Document_${idx + 1}.pdf`,
        }));
        setPendingAttachments((prev) => [...prev, ...newDocItems]);
      }
    } catch (err: any) {
      if (
        DocumentPicker?.isCancel?.(err) ||
        err?.message?.includes?.('canceled') ||
        err?.message?.includes?.('cancelled')
      ) {
        console.log('User cancelled document picker');
        return;
      }
      console.warn('Native DocumentPicker not available in running binary:', err?.message);
    }
  };

  const handleDocumentClick = () => {
    Keyboard.dismiss();
    setShowAttachments(false);
    setShowDocumentModal(true);
  };

  const handleConfirmSendPhoto = () => {
    setShowCameraModal(false);
    setPendingAttachments((prev) => [
      ...prev,
      {
        id: `${Date.now()}_${Math.random()}`,
        type: 'image',
        uri: selectedPhoto,
        name: photoCaption ? `Photo: ${photoCaption}` : 'Selected_Photo.jpg',
      },
    ]);
    setPhotoCaption('');
  };

  const requestAudioPermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return true;
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'Synapse needs access to your microphone for voice transcription.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn('Audio permission request failed:', err);
      return false;
    }
  };

  const handleAttachmentItem = (type: string) => {
    setShowAttachments(false);
    if (type === 'camera') {
      handleCameraClick();
      return;
    }
    if (type === 'gallery') {
      handleGalleryClick();
      return;
    }
    if (type === 'video') {
      handleVideoClick();
      return;
    }
    if (type === 'document') {
      handleDocumentClick();
      return;
    }
    onAttachmentSelect?.(type);
  };

  // Start WebSpeech Capture
  const handleMicClick = async () => {
    if (onAudioPress) {
      onAudioPress();
      return;
    }
    Keyboard.dismiss();
    setShowAttachments(false);
    setTranscription('');
    setIsProcessing(false);

    setIsListening(true);
    setIsRecording(true);

    const hasPermission = await requestAudioPermission();
    if (!hasPermission) {
      setIsRecording(false);
      setTranscription('Microphone permission denied.');
      return;
    }

    webSpeechRef.current?.startListening();
  };

  const handleStopAndTranscribe = () => {
    setIsRecording(false);
    setIsProcessing(false);
    webSpeechRef.current?.stopListening();
  };

  const handleSendVoiceText = () => {
    setIsRecording(false);
    setIsProcessing(false);
    webSpeechRef.current?.stopListening();
    const finalSpeech = transcription.trim();
    setIsListening(false);
    setTranscription('');
    if (finalSpeech) {
      onSend?.(finalSpeech);
    }
  };

  const handleCancelVoice = () => {
    setIsRecording(false);
    setIsProcessing(false);
    webSpeechRef.current?.stopListening();
    setIsListening(false);
    setTranscription('');
  };

  return (
    <View style={styles.wrapper}>
      {/* Hidden Chrome WebSpeech Bridge (WebView) */}
      <WebSpeechBridge
        ref={webSpeechRef}
        onResult={(text) => {
          if (text) {
            setTranscription(text);
            setIsProcessing(false);
          }
        }}
        onError={(err) => console.warn('WebSpeech error:', err)}
      />

      {/* 1. Voice Listening Modal Subcomponent */}
      <VoiceRecordingModal
        visible={isListening}
        isListening={isListening}
        isRecording={isRecording}
        isProcessing={isProcessing}
        recordingSeconds={recordingSeconds}
        transcription={transcription}
        pulseAnim={pulseAnim}
        onTranscriptionChange={setTranscription}
        onStopAndTranscribe={handleStopAndTranscribe}
        onSendVoiceText={handleSendVoiceText}
        onCancel={handleCancelVoice}
      />

      {/* 2. Attachments Popup Menu Subcomponent */}
      <AttachmentMenuPopover
        visible={showAttachments}
        onSelectOption={handleAttachmentItem}
        onClose={() => setShowAttachments(false)}
      />

      {/* 3. Suggestions Row Subcomponent */}
      <ChatSuggestionsRow
        suggestions={suggestions}
        onSelectSuggestion={onSelectSuggestion}
        onSelectDefaultSuggestion={handleChangeText}
        onCloseAttachments={() => setShowAttachments(false)}
      />

      {/* 4. Multi Pending Attachments Preview Banner Subcomponent */}
      <AttachmentPreviewTray
        pendingAttachments={pendingAttachments}
        onRemoveAttachment={handleRemoveAttachment}
        onClearAll={() => setPendingAttachments([])}
        onAddMore={() => setShowAttachments(true)}
      />

      {/* Main Chat Input Container */}
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.canvas,
            borderColor: theme.isDarkMode ? '#262A34' : '#F0F3F8',
          },
          style,
        ]}>
        {/* Text Input Box */}
        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: theme.isDarkMode ? '#1F222A' : '#FAFAFA',
              borderColor: isFocused
                ? theme.colors.primary
                : theme.isDarkMode
                ? '#35383F'
                : '#E8ECF4',
              borderRadius: theme.radius.card,
            },
          ]}>
          {/* + Attachment Button inside input field */}
          <TouchableOpacity
            style={styles.inlinePlusBtn}
            onPress={() => setShowAttachments(!showAttachments)}
            activeOpacity={0.7}
            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
            <PlusIcon size={20} color={theme.colors.primary} />
          </TouchableOpacity>

          <TextInput
            style={[
              styles.input,
              theme.typography.bodyMd,
              { color: theme.colors.textPrimary },
            ]}
            value={value}
            onChangeText={handleChangeText}
            placeholder={isFocused ? '' : placeholder}
            placeholderTextColor={theme.colors.textMuted}
            onFocus={() => {
              setIsFocused(true);
              setShowAttachments(false);
            }}
            onBlur={() => setIsFocused(false)}
            multiline={true}
            blurOnSubmit={false}
            textAlignVertical="center"
          />

          {/* Camera & Mic Buttons inside input (visible only when input is empty & no pending attachments) */}
          {!hasText && pendingAttachments.length === 0 ? (
            <>
              <TouchableOpacity
                style={styles.inlineIconBtn}
                onPress={handleCameraClick}
                activeOpacity={0.7}
                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
                <CameraIcon size={20} color={theme.colors.textMuted} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.inlineIconBtn}
                onPress={handleMicClick}
                activeOpacity={0.7}
                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
                <AudioIcon size={20} color={theme.colors.textMuted} />
              </TouchableOpacity>
            </>
          ) : null}
        </View>

        {/* Send Arrow Button */}
        <TouchableOpacity
          style={[
            styles.sendButton,
            {
              backgroundColor: canSend ? theme.colors.primary : theme.colors.textMuted,
              opacity: canSend ? 1 : 0.4,
            },
          ]}
          onPress={handleSend}
          disabled={!canSend}
          activeOpacity={0.8}>
          <SendArrowIcon size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* 5. Camera Capture Modal Subcomponent */}
      <CameraCaptureModal
        visible={showCameraModal}
        selectedPhoto={selectedPhoto}
        photoCaption={photoCaption}
        samplePhotos={SAMPLE_PHOTOS}
        onSelectPhoto={setSelectedPhoto}
        onCaptionChange={setPhotoCaption}
        onConfirm={handleConfirmSendPhoto}
        onCancel={() => setShowCameraModal(false)}
      />

      {/* 6. Document Selection Modal Subcomponent */}
      <DocumentPickerModal
        visible={showDocumentModal}
        onOpenNativePicker={handleOpenNativeDocumentPicker}
        onClose={() => setShowDocumentModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    position: 'relative',
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 8,
  },
  inlinePlusBtn: {
    paddingRight: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 1,
    minHeight: 48,
    maxHeight: 120,
    borderWidth: 1.5,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 6 : 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  input: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 4 : 2,
    fontSize: 15,
    lineHeight: 20,
  },
  inlineIconBtn: {
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
  },
});

export default ChatInputBar;
