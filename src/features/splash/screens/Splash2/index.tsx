import React from 'react';
import { Animated, SafeAreaView, StatusBar, View } from 'react-native';
import { Loader, RobotIllustration } from '../../../../shared/components';
import { BUBBLE_COLOR } from './constants';
import { styles } from './styles';
import { Splash2ScreenProps, useSplash2 } from './useSplash2';

export type { Splash2ScreenProps };

export const Splash2Screen: React.FC<Splash2ScreenProps> = (props) => {
  const { fadeAnim } = useSplash2(props);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
        <View style={styles.illustrationWrapper}>
          <RobotIllustration size={280} bubbleColor={BUBBLE_COLOR} />
        </View>

        <View style={styles.loaderWrapper}>
          <Loader size={38} color={BUBBLE_COLOR} />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Splash2Screen;
