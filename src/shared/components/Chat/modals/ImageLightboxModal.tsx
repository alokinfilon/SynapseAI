import React, { useState } from 'react';
import {
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export interface ImageLightboxModalProps {
  visible: boolean;
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  visible,
  images,
  initialIndex = 0,
  onClose,
}) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  // Sync initialIndex when modal opens
  React.useEffect(() => {
    if (visible) {
      setActiveIndex(initialIndex);
    }
  }, [visible, initialIndex]);

  if (!visible || images.length === 0) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.fullImageModalContainer}>
        {/* Header: count + close button */}
        <View style={styles.fullImageHeader}>
          <Text style={styles.lightboxCountText}>
            Photo {activeIndex + 1} of {images.length}
          </Text>
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeFullImageBtn}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
            <Text style={styles.closeFullImageText}>✕ Close</Text>
          </TouchableOpacity>
        </View>

        {/* Image + Navigation */}
        <View style={styles.fullImageContentRow}>
          {/* Left nav arrow */}
          {images.length > 1 && activeIndex > 0 ? (
            <TouchableOpacity
              style={styles.lightboxNavBtnLeft}
              onPress={() => setActiveIndex((prev) => Math.max(0, prev - 1))}>
              <Text style={styles.navBtnText}>‹</Text>
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            style={styles.fullImageContent}
            activeOpacity={1}
            onPress={onClose}>
            <Image
              source={{ uri: images[activeIndex] || images[0] }}
              style={styles.fullScreenImage}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Right nav arrow */}
          {images.length > 1 && activeIndex < images.length - 1 ? (
            <TouchableOpacity
              style={styles.lightboxNavBtnRight}
              onPress={() => setActiveIndex((prev) => Math.min(images.length - 1, prev + 1))}>
              <Text style={styles.navBtnText}>›</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullImageModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.94)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImageHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 28 : 14,
    zIndex: 10,
  },
  lightboxCountText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  closeFullImageBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  closeFullImageText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  fullImageContentRow: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  fullImageContent: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
  lightboxNavBtnLeft: {
    position: 'absolute',
    left: 14,
    zIndex: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightboxNavBtnRight: {
    position: 'absolute',
    right: 14,
    zIndex: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBtnText: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '600',
    marginTop: -4,
  },
});

export default ImageLightboxModal;
