import React from 'react';
import { Animated, SafeAreaView, StatusBar, View } from 'react-native';
import { Loader, RobotIllustration } from '../../../../shared/components';
import { styles } from './styles';
import { Splash1ScreenProps, useSplash1 } from './useSplash1';

export type { Splash1ScreenProps };

export const Splash1Screen: React.FC<Splash1ScreenProps> = (props) => {
  const { theme, fadeAnim } = useSplash1(props);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.canvas }]}>
      <StatusBar barStyle={theme.isDarkMode ? 'light-content' : 'dark-content'} />
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
        <View style={styles.illustrationWrapper}>
          <RobotIllustration size={280} />
        </View>

        <View style={styles.loaderWrapper}>
          <Loader size={38} color={theme.colors.primary} />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Splash1Screen;
