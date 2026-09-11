import React, { useRef, useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type LayoutRectangle,
  type MeasureOnSuccessCallback,
} from 'react-native';
import {
  CopyIcon,
  DeleteIcon,
  DoneIcon,
  MoreIcon,
  PenIcon,
  RetryIcon,
} from '../../../../../assets';
import { useTheme } from '../../../../hooks';

export interface MessageActionBarProps {
  id: string;
  isUser: boolean;
  isLatest: boolean;
  onCopy: () => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onRetry?: (id: string) => void;
}

export const MessageActionBar: React.FC<MessageActionBarProps> = ({
  id,
  isUser,
  isLatest,
  onCopy,
  onEdit,
  onDelete,
  onRetry,
}) => {
  const theme = useTheme();
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [btnLayout, setBtnLayout] = useState<LayoutRectangle | null>(null);
  const moreBtnRef = useRef<any>(null);

  const handleCopyPress = () => {
    onCopy();
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  };

  const openMenu = () => {
    (moreBtnRef.current as any)?.measure(
      (_x: number, _y: number, _w: number, _h: number, pageX: number, pageY: number) => {
        setBtnLayout({ x: pageX, y: pageY, width: _w, height: _h });
        setShowMoreMenu(true);
      }
    );
  };

  const closeMenu = () => setShowMoreMenu(false);

  // Popover menu rendered fully inside the Modal so backdrop and items
  // are at the same native layer — taps on items register correctly.
  const renderPopover = () => {
    if (!btnLayout) return null;

    // Position the menu above the button
    const menuTop = btnLayout.y - 8; // offset above button
    const menuRight = isUser
      ? undefined
      : undefined;

    return (
      <Modal
        transparent
        visible={showMoreMenu}
        animationType="fade"
        onRequestClose={closeMenu}>
        {/* Full-screen backdrop — tap anywhere to close */}
        <TouchableOpacity
          style={styles.fullBackdrop}
          activeOpacity={1}
          onPress={closeMenu}
        />

        {/* Menu card — positioned based on measured button coords */}
        <View
          style={[
            styles.popoverCard,
            {
              backgroundColor: theme.isDarkMode ? '#1F222A' : '#FFFFFF',
              borderColor: theme.isDarkMode ? '#35383F' : '#E2E8F0',
              top: menuTop - 110, // float above the button
              ...(isUser
                ? { right: 16 }
                : { left: btnLayout.x }),
            },
          ]}>
          {/* Bot: Retry */}
          {!isUser && isLatest ? (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => { closeMenu(); onRetry?.(id); }}
              activeOpacity={0.75}>
              <RetryIcon size={14} color={theme.colors.textPrimary} />
              <Text style={[styles.menuItemText, { color: theme.colors.textPrimary }]}>
                Retry
              </Text>
            </TouchableOpacity>
          ) : null}

          {/* User: Edit */}
          {isUser ? (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => { closeMenu(); onEdit?.(id); }}
              activeOpacity={0.75}>
              <PenIcon size={14} color={theme.colors.textPrimary} />
              <Text style={[styles.menuItemText, { color: theme.colors.textPrimary }]}>
                Edit
              </Text>
            </TouchableOpacity>
          ) : null}

          {/* Both: Delete */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => { closeMenu(); onDelete?.(id); }}
            activeOpacity={0.75}>
            <DeleteIcon size={14} color="#EF4444" />
            <Text style={[styles.menuItemText, { color: '#EF4444', fontWeight: '700' }]}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  };

  const actionRow = isUser ? styles.actionRowUser : styles.actionRowBot;

  return (
    <View style={actionRow}>
      {/* Copy button */}
      <TouchableOpacity
        style={styles.actionItemBtn}
        onPress={handleCopyPress}
        activeOpacity={0.7}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
        {isCopied ? (
          <DoneIcon size={16} color={theme.colors.primary} />
        ) : (
          <CopyIcon size={16} color={theme.colors.textMuted} />
        )}
      </TouchableOpacity>

      {/* More (⋯) button */}
      <View ref={moreBtnRef as any} collapsable={false}>
        <TouchableOpacity
          style={styles.actionItemBtn}
          onPress={openMenu}
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <MoreIcon size={16} color={theme.colors.textMuted} />
        </TouchableOpacity>
      </View>

      {renderPopover()}
    </View>
  );
};

const styles = StyleSheet.create({
  actionRowBot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 5,
    paddingHorizontal: 4,
    alignSelf: 'flex-start',
  },
  actionRowUser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 5,
    paddingHorizontal: 4,
    alignSelf: 'flex-end',
  },
  actionItemBtn: {
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  popoverCard: {
    position: 'absolute',
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 14,
    minWidth: 115,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
  },
  menuItemText: {
    fontSize: 13,
    fontWeight: '600',
  },
});

export default MessageActionBar;
