import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export interface MessageImageGridProps {
  images: string[];
  onImagePress: (index: number) => void;
}

export const MessageImageGrid: React.FC<MessageImageGridProps> = ({
  images,
  onImagePress,
}) => {
  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <TouchableOpacity onPress={() => onImagePress(0)} activeOpacity={0.9}>
        <Image source={{ uri: images[0] }} style={styles.messageImage} resizeMode="cover" />
      </TouchableOpacity>
    );
  }

  if (images.length === 2) {
    return (
      <View style={styles.imageGridRow}>
        {images.map((imgUri, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => onImagePress(idx)}
            activeOpacity={0.9}>
            <Image source={{ uri: imgUri }} style={styles.gridImageTwo} resizeMode="cover" />
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  if (images.length === 3) {
    return (
      <View style={styles.imageGridThreeContainer}>
        <TouchableOpacity onPress={() => onImagePress(0)} activeOpacity={0.9}>
          <Image source={{ uri: images[0] }} style={styles.gridThreeTop} resizeMode="cover" />
        </TouchableOpacity>
        <View style={styles.imageGridRow}>
          {images.slice(1, 3).map((imgUri, idx) => (
            <TouchableOpacity
              key={idx + 1}
              onPress={() => onImagePress(idx + 1)}
              activeOpacity={0.9}>
              <Image source={{ uri: imgUri }} style={styles.gridImageTwo} resizeMode="cover" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  // 4+ images: 2×2 grid, +N badge on 4th tile for 5+
  return (
    <View style={styles.imageGridRow}>
      {images.slice(0, 3).map((imgUri, idx) => (
        <TouchableOpacity
          key={idx}
          onPress={() => onImagePress(idx)}
          activeOpacity={0.9}>
          <Image source={{ uri: imgUri }} style={styles.gridImageTwo} resizeMode="cover" />
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        onPress={() => onImagePress(3)}
        activeOpacity={0.9}
        style={{ position: 'relative' }}>
        <Image source={{ uri: images[3] }} style={styles.gridImageTwo} resizeMode="cover" />
        {images.length > 4 ? (
          <View style={styles.moreImagesOverlay}>
            <Text style={styles.moreImagesText}>+{images.length - 4}</Text>
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  messageImage: {
    width: 220,
    height: 160,
    borderRadius: 14,
  },
  imageGridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    maxWidth: 236,
  },
  gridImageTwo: {
    width: 114,
    height: 114,
    borderRadius: 12,
  },
  gridImageThree: {
    width: 74,
    height: 74,
    borderRadius: 10,
  },
  imageGridThreeContainer: {
    gap: 6,
    maxWidth: 236,
  },
  gridThreeTop: {
    width: 234,
    height: 125,
    borderRadius: 12,
  },
  moreImagesOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreImagesText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
});

export default MessageImageGrid;
