import React from 'react';
import { Animated, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { Button, PaginationIndicator, RobotIllustration } from '../../../../shared/components';
import { ACTIVE_PAGE, ONBOARDING3_BUTTON_TEXT, ONBOARDING3_TITLE, TOTAL_PAGES } from './constants';
import { styles } from './styles';
import { Onboarding3ScreenProps, useOnboarding3 } from './useOnboarding3';

export type { Onboarding3ScreenProps };

export const Onboarding3Screen: React.FC<Onboarding3ScreenProps> = (props) => {
  const { theme, fadeAnim, handlePress } = useOnboarding3(props);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.canvas }]}>
      <StatusBar barStyle={theme.isDarkMode ? 'light-content' : 'dark-content'} />
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
        <View style={styles.illustrationWrapper}>
          <RobotIllustration size={280} />
        </View>

        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              theme.typography.displayXl,
              { color: theme.colors.textPrimary },
            ]}>
            {ONBOARDING3_TITLE}
          </Text>
        </View>

        <View style={styles.bottomSection}>
          <PaginationIndicator count={TOTAL_PAGES} activeIndex={ACTIVE_PAGE} style={styles.pagination} />
          <Button title={ONBOARDING3_BUTTON_TEXT} onPress={handlePress} style={styles.button} />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Onboarding3Screen;
