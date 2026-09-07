import React from 'react';
import { Animated, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { Button, PaginationIndicator, RobotIllustration } from '../../../../shared/components';
import { ACTIVE_PAGE, ONBOARDING1_BUTTON_TEXT, ONBOARDING1_TITLE, TOTAL_PAGES } from './constants';
import { styles } from './styles';
import { Onboarding1ScreenProps, useOnboarding1 } from './useOnboarding1';

export type { Onboarding1ScreenProps };

export const Onboarding1Screen: React.FC<Onboarding1ScreenProps> = (props) => {
  const { theme, fadeAnim, onNext } = useOnboarding1(props);

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
            {ONBOARDING1_TITLE}
          </Text>
        </View>

        <View style={styles.bottomSection}>
          <PaginationIndicator count={TOTAL_PAGES} activeIndex={ACTIVE_PAGE} style={styles.pagination} />
          <Button title={ONBOARDING1_BUTTON_TEXT} onPress={onNext} style={styles.button} />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Onboarding1Screen;
