import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScreenHeader } from '../../../../shared/components';
import { styles } from './styles';
import { RobotCustomizerScreenProps, useRobotCustomizer } from './useRobotCustomizer';
import RobotCanvasPreview from './components/RobotCanvasPreview';
import CustomizerControlTabs from './components/CustomizerControlTabs';

export type { RobotCustomizerScreenProps };

export const RobotCustomizerScreen: React.FC<RobotCustomizerScreenProps> = (props) => {
  const {
    theme,
    renderMode,
    setRenderMode,
    expression,
    setExpression,
    avatarSize,
    setAvatarSize,
    selectedGlow,
    setSelectedGlow,
    handleSaveDone,
    onBack,
  } = useRobotCustomizer(props);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.canvas }]}>
      <StatusBar barStyle={theme.isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Top Header Bar */}
      <ScreenHeader
        title="Lumi AI Studio & Playground"
        onBack={onBack}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Live Robot Preview Canvas */}
        <RobotCanvasPreview
          renderMode={renderMode}
          expression={expression}
          avatarSize={avatarSize}
          selectedGlow={selectedGlow}
        />

        {/* Customization Controls + Save Button */}
        <CustomizerControlTabs
          renderMode={renderMode}
          expression={expression}
          avatarSize={avatarSize}
          selectedGlow={selectedGlow}
          onSetRenderMode={setRenderMode}
          onSetExpression={setExpression}
          onSetAvatarSize={setAvatarSize}
          onSetSelectedGlow={setSelectedGlow}
          onSaveDone={handleSaveDone}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RobotCustomizerScreen;
