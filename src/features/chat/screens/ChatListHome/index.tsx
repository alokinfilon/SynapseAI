import React from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DeleteIcon, EditIcon, GraphUpIcon, SearchIcon, SettingIcon } from '../../../../../assets';
import {
  ChatCard,
  ComingSoonModal,
  ConfirmationModal,
  DropdownMenu,
  DropdownMenuItem,
  FloatingActionButton,
  HeaderBar,
  Input,
  RenameChatModal,
  RobotAvatar,
  SectionHeader,
} from '../../../../shared/components';
import { CHAT_LIST_TEXTS } from './constants';
import { styles } from './styles';
import { useChatListHome, UseChatListHomeProps } from './useChatListHome';

export interface ChatListHomeScreenProps extends UseChatListHomeProps { }

export const ChatListHomeScreen: React.FC<ChatListHomeScreenProps> = (props) => {
  const {
    theme,
    searchQuery,
    setSearchQuery,
    isSearchVisible,
    toggleSearch,
    activeThreads,
    endedThreads,
    onOpenChat,
    onLongPressChat,
    onSeeAllEnded,
    onNewChat,
    onCustomizeRobot,
    onOpenMenu,
    // Coming soon modal props
    comingSoonModalVisible,
    comingSoonTitle,
    comingSoonSubtitle,
    onCloseComingSoonModal,
    // Options sheet props
    optionsModalVisible,
    threadForOptions,
    menuTop,
    onCloseOptionsModal,
    onSelectEditFromOptions,
    onSelectDeleteFromOptions,
    // Delete modal props
    deleteModalVisible,
    threadToDelete,
    onConfirmDelete,
    onCancelDelete,
    // Edit modal props
    editModalVisible,
    threadToEdit,
    editTitleText,
    setEditTitleText,
    onSaveEdit,
    onCancelEdit,
  } = useChatListHome(props);

  const menuItems: DropdownMenuItem[] = threadForOptions
    ? [
        {
          id: 'edit',
          label: 'Edit Title',
          icon: <EditIcon size={16} color={theme.colors.primary} />,
          onPress: onSelectEditFromOptions,
        },
        {
          id: 'delete',
          label: 'Delete Chat',
          icon: <DeleteIcon size={16} color="#EF4444" />,
          isDestructive: true,
          onPress: onSelectDeleteFromOptions,
        },
      ]
    : [];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.canvas }]}>
      <StatusBar barStyle={theme.isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Shared Header */}
      <HeaderBar
        title={CHAT_LIST_TEXTS.headerTitle}
        leftIcon={<RobotAvatar size={46} expression="normal" showParticles={false} />}
        rightActions={
          <>
            <TouchableOpacity onPress={toggleSearch} style={styles.actionIconBtn} activeOpacity={0.7}>
              <SearchIcon size={19} color={theme.colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onCustomizeRobot} style={styles.actionIconBtn} activeOpacity={0.7}>
              <GraphUpIcon size={24} color={theme.colors.textPrimary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onOpenMenu} style={styles.actionIconBtn} activeOpacity={0.7}>
              <SettingIcon size={24} color={theme.colors.textPrimary} />
            </TouchableOpacity>
          </>
        }
      />

      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>

          {isSearchVisible && (
            <Input
              placeholder={CHAT_LIST_TEXTS.searchPlaceholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
              leftIcon={<SearchIcon size={15} color={theme.colors.textMuted} />}
              containerStyle={styles.searchInput}
            />
          )}

          {/* Active Chats Section */}
          <SectionHeader title={CHAT_LIST_TEXTS.activeSectionTitle} />
          {activeThreads.map((chat) => (
            <ChatCard
              key={chat.id}
              title={chat.title}
              subtitle={chat.subtitle}
              time={chat.time}
              unreadCount={chat.unreadCount}
              expression={chat.expression}
              onPress={() => onOpenChat?.(chat.id)}
              onLongPress={(e) => onLongPressChat(chat, e?.nativeEvent?.pageY)}
            />
          ))}

          {/* Ended Chats Section */}
          {endedThreads.length > 0 && (
            <>
              <SectionHeader
                title={CHAT_LIST_TEXTS.endedSectionTitle}
                actionLabel={CHAT_LIST_TEXTS.seeAllLink}
                onActionPress={onSeeAllEnded}
              />
              {endedThreads.map((chat) => (
                <ChatCard
                  key={chat.id}
                  title={chat.title}
                  subtitle={chat.subtitle}
                  time={chat.time}
                  expression={chat.expression}
                  onPress={() => onOpenChat?.(chat.id)}
                  onLongPress={(e) => onLongPressChat(chat, e?.nativeEvent?.pageY)}
                />
              ))}
            </>
          )}
        </ScrollView>

        {/* Bottom Right Floating Plus Button */}
        <FloatingActionButton onPress={onNewChat} />
      </View>

      {/* Small Dropdown Menu on Long Press */}
      <DropdownMenu
        visible={optionsModalVisible}
        items={menuItems}
        onClose={onCloseOptionsModal}
        style={{ top: menuTop || 150, right: 24, width: 175, borderRadius: 16 }}
      />

      {/* Edit Chat Title Modal */}
      <RenameChatModal
        visible={editModalVisible}
        titleText={editTitleText}
        expression={threadToEdit?.expression || 'smile'}
        onChangeTitleText={setEditTitleText}
        onSave={onSaveEdit}
        onCancel={onCancelEdit}
      />

      {/* Delete Chat Confirmation Modal */}
      <ConfirmationModal
        visible={deleteModalVisible}
        title="Delete Chat?"
        subtitle={`Are you sure you want to delete "${threadToDelete?.title}"? This conversation will be removed.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={onConfirmDelete}
        onCancel={onCancelDelete}
      />

      {/* Coming Soon Modal for Settings / Trends */}
      <ComingSoonModal
        visible={comingSoonModalVisible}
        onClose={onCloseComingSoonModal}
        title={comingSoonTitle}
        subtitle={comingSoonSubtitle}
      />
    </SafeAreaView>
  );
};

export default ChatListHomeScreen;
