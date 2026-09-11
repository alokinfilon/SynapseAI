import React, { useRef, useState } from 'react';
import {
  Animated,
  Clipboard,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../../hooks';
import { RobotAvatar } from '../Icon';
import { ReplyIcon } from '../../../../assets/svg';
import ImageLightboxModal from './modals/ImageLightboxModal';
import MessageImageGrid from './subcomponents/MessageImageGrid';
import MessageActionBar from './subcomponents/MessageActionBar';
import DocumentAttachmentCard from './subcomponents/DocumentAttachmentCard';
import MarkdownText from './subcomponents/MarkdownText';

export type MessageSender = 'user' | 'bot';

export interface ChatMessageProps {
  id: string;
  sender: MessageSender;
  text: string;
  imageUrl?: string;
  images?: string[];
  time?: string;
  avatarIcon?: React.ReactNode;
  style?: ViewStyle;
  isLatest?: boolean;
  onCopy?: (text: string) => void;
  onEdit?: (id: string) => void;
  onReply?: (id: string, text: string) => void;
  onRetry?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const ChatMessageBubble: React.FC<ChatMessageProps> = ({
  id,
  sender,
  text,
  imageUrl,
  images,
  time,
  avatarIcon,
  style,
  isLatest = false,
  onCopy,
  onEdit,
  onReply,
  onRetry,
  onDelete,
}) => {
  const theme = useTheme();
  const isUser = sender === 'user';
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const allImages = images && images.length > 0 ? images : imageUrl ? [imageUrl] : [];

  // Swipe-right to reply PanResponder
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) =>
        gestureState.dx > 10 &&
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy) * 1.5,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx > 0) {
          translateX.setValue(Math.min(gestureState.dx * 0.55, 65));
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 40) {
          onReply?.(id, text);
        }
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          bounciness: 6,
        }).start();
      },
      onPanResponderTerminate: () => {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  const replyIconScale = translateX.interpolate({
    inputRange: [0, 40],
    outputRange: [0.3, 1],
    extrapolate: 'clamp',
  });

  const replyIconOpacity = translateX.interpolate({
    inputRange: [0, 20, 40],
    outputRange: [0, 0.6, 1],
    extrapolate: 'clamp',
  });

  const defaultAvatar = !isUser
    ? avatarIcon || <RobotAvatar size={44} expression="smile" showParticles={false} />
    : null;

  const handleCopy = () => {
    if (text) {
      Clipboard.setString(text);
      onCopy?.(text);
    }
  };

  const handleImagePress = (index: number) => {
    setLightboxIndex(index);
    setShowLightbox(true);
  };

  const isDocumentText =
    text && (text.startsWith('Attached Document:') || text.startsWith('[Document]'));

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userContainer : styles.botContainer,
        style,
      ]}>
      {!isUser && defaultAvatar ? (
        <View style={styles.avatarWrapper}>{defaultAvatar}</View>
      ) : null}

      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.bubbleWrapper, { transform: [{ translateX }] }]}>
        {/* Swipe Right to Reply Circle Indicator */}
        <Animated.View
          style={[
            styles.swipeReplyBadge,
            {
              backgroundColor: theme.isDarkMode ? '#1E293B' : '#E6FFFA',
              borderColor: theme.isDarkMode ? '#334155' : '#00A884',
              opacity: replyIconOpacity,
              transform: [{ scale: replyIconScale }],
            },
          ]}>
          <ReplyIcon size={16} color="#00A884" />
        </Animated.View>

        <TouchableOpacity
          activeOpacity={0.9}>
          <View
            style={[
              styles.bubble,
              isUser
                ? [styles.userBubble, { backgroundColor: theme.colors.primary }]
                : [
                    styles.botBubble,
                    {
                      backgroundColor: theme.isDarkMode ? '#1F222A' : '#F8FAFC',
                      borderColor: theme.isDarkMode ? '#35383F' : '#E2E8F0',
                    },
                    theme.shadows.sm,
                  ],
            ]}>
            {/* Multi-Image Grid */}
            {allImages.length > 0 ? (
              <MessageImageGrid images={allImages} onImagePress={handleImagePress} />
            ) : null}

            {/* Document Attachment Card */}
            {isDocumentText ? (
              <DocumentAttachmentCard text={text} isUser={isUser} />
            ) : text ? (
              <View style={{ marginTop: allImages.length > 0 ? 8 : 0 }}>
                <MarkdownText text={text} isUser={isUser} />
              </View>
            ) : null}

            {/* Timestamp inside bubble */}
            {time ? (
              <Text
                style={[
                  styles.bubbleTimestamp,
                  {
                    color: isUser ? 'rgba(255, 255, 255, 0.75)' : theme.colors.textMuted,
                  },
                ]}>
                {time}
              </Text>
            ) : null}
          </View>
        </TouchableOpacity>

        {/* Action Bar below bubble */}
        <MessageActionBar
          id={id}
          isUser={isUser}
          isLatest={isLatest}
          onCopy={handleCopy}
          onEdit={onEdit}
          onDelete={onDelete}
          onRetry={onRetry}
        />
      </Animated.View>

      {/* Full-Screen Image Lightbox Modal */}
      <ImageLightboxModal
        visible={showLightbox}
        images={allImages}
        initialIndex={lightboxIndex}
        onClose={() => setShowLightbox(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 6,
    alignItems: 'flex-end',
    position: 'relative',
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  botContainer: {
    justifyContent: 'flex-start',
  },
  avatarWrapper: {
    marginRight: 6,
    marginBottom: 4,
  },
  bubbleWrapper: {
    maxWidth: '86%',
    position: 'relative',
  },
  swipeReplyBadge: {
    position: 'absolute',
    left: -36,
    top: 10,
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
    elevation: 4,
  },
  bubble: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userBubble: {
    borderBottomRightRadius: 6,
  },
  botBubble: {
    borderBottomLeftRadius: 6,
    borderWidth: 1,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 21,
  },
  bubbleTimestamp: {
    fontSize: 10,
    fontWeight: '500',
    alignSelf: 'flex-end',
    marginTop: 4,
    marginLeft: 12,
  },
});

export default ChatMessageBubble;
