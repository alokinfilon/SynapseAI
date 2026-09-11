import React from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AudioIcon } from '../../../../../assets/svg';
import { useTheme } from '../../../../hooks';

export interface VoiceRecordingModalProps {
  visible: boolean;
  isListening: boolean;
  isRecording: boolean;
  isProcessing: boolean;
  recordingSeconds: number;
  transcription: string;
  pulseAnim: Animated.Value;
  onTranscriptionChange: (text: string) => void;
  onStopAndTranscribe: () => void;
  onSendVoiceText: () => void;
  onCancel: () => void;
}

export const VoiceRecordingModal: React.FC<VoiceRecordingModalProps> = ({
  visible,
  isRecording,
  isProcessing,
  recordingSeconds,
  transcription,
  pulseAnim,
  onTranscriptionChange,
  onStopAndTranscribe,
  onSendVoiceText,
  onCancel,
}) => {
  const theme = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}>
      <View style={styles.voiceModalOverlay}>
        <View
          style={[
            styles.voiceModalContainer,
            {
              backgroundColor: theme.isDarkMode ? '#1F222A' : '#FFFFFF',
              borderColor: theme.isDarkMode ? '#35383F' : '#E2E8F0',
            },
          ]}>
          {/* Pulsing Mic Circle */}
          <View style={styles.micPulseWrapper}>
            <Animated.View
              style={[
                styles.micPulseBg,
                {
                  transform: [{ scale: pulseAnim }],
                  backgroundColor: 'rgba(0, 168, 132, 0.25)',
                },
              ]}
            />
            <View style={[styles.micPulseIcon, { backgroundColor: '#00A884' }]}>
              <AudioIcon size={30} color="#FFFFFF" />
            </View>
          </View>

          {/* Live Recording Timer / Processing Indicator */}
          {isRecording ? (
            <View style={{ alignItems: 'center', marginBottom: 12 }}>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#00A884' }}>
                {Math.floor(recordingSeconds / 60)
                  .toString()
                  .padStart(2, '0')}
                :{(recordingSeconds % 60).toString().padStart(2, '0')}
              </Text>
            </View>
          ) : isProcessing ? (
            <View style={{ alignItems: 'center', marginBottom: 12 }}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: theme.colors.primary }}>
                ⏳ Transcribing audio speech...
              </Text>
            </View>
          ) : (
            /* Live Audio Equalizer Wave Bar */
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, height: 24, marginBottom: 12 }}>
              {[14, 26, 20, 26, 16, 22].map((heightVal, i) => (
                <View
                  key={i}
                  style={{
                    width: 4,
                    height: heightVal,
                    borderRadius: 2,
                    backgroundColor: '#00A884',
                    opacity: 0.85,
                  }}
                />
              ))}
            </View>
          )}

          <Text style={[styles.voiceStatusTitle, { color: theme.colors.textPrimary }]}>
            {isRecording
              ? 'Recording Audio'
              : isProcessing
              ? 'Transcribing Speech'
              : transcription
              ? 'Voice Message Preview'
              : 'Listening & Ready'}
          </Text>

          {/* Real-time Voice Transcription Display / Editable Box */}
          <View
            style={[
              styles.transcriptionBox,
              {
                backgroundColor: theme.isDarkMode ? '#262A34' : '#F8FAFC',
                borderColor: theme.isDarkMode ? '#35383F' : '#E2E8F0',
                marginBottom: 20,
              },
            ]}>
            <TextInput
              style={[
                styles.transcriptionText,
                { color: theme.colors.textPrimary },
              ]}
              value={transcription}
              onChangeText={onTranscriptionChange}
              placeholder={isRecording ? 'Listening... Speak now into microphone' : 'Tap mic to speak'}
              placeholderTextColor={theme.colors.textMuted}
              multiline
            />
          </View>

          {/* Action Buttons */}
          <View style={styles.voiceActionRow}>
            <TouchableOpacity
              style={[styles.voiceCancelBtn, { borderColor: theme.isDarkMode ? '#35383F' : '#E2E8F0' }]}
              onPress={onCancel}
              activeOpacity={0.8}>
              <Text style={[styles.voiceCancelText, { color: theme.colors.textMuted }]}>
                Cancel
              </Text>
            </TouchableOpacity>

            {isRecording ? (
              <TouchableOpacity
                style={[styles.voiceSendBtn, { backgroundColor: '#00A884' }]}
                onPress={onStopAndTranscribe}
                activeOpacity={0.8}>
                <Text style={styles.voiceSendText}>Stop & Transcribe</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  styles.voiceSendBtn,
                  {
                    backgroundColor: transcription ? '#00A884' : '#CBD5E1',
                    opacity: transcription ? 1 : 0.6,
                  },
                ]}
                onPress={onSendVoiceText}
                disabled={!transcription}
                activeOpacity={0.8}>
                <Text style={styles.voiceSendText}>Send to Chat</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  voiceModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  voiceModalContainer: {
    width: '100%',
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
  micPulseWrapper: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  micPulseBg: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  micPulseIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00A884',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  voiceStatusTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 14,
    textAlign: 'center',
  },
  transcriptionBox: {
    width: '100%',
    minHeight: 70,
    maxHeight: 120,
    borderRadius: 16,
    borderWidth: 1,
    padding: 14,
    justifyContent: 'center',
  },
  transcriptionText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  voiceActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  voiceCancelBtn: {
    flex: 1,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceCancelText: {
    fontSize: 14,
    fontWeight: '600',
  },
  voiceSendBtn: {
    flex: 1.5,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceSendText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default VoiceRecordingModal;
