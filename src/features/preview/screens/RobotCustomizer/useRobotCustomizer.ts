import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../../../../hooks';
import { MainStackParamList } from '../../../../navigation/types';
import { RobotExpression } from '../../../../shared/components';

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'RobotCustomizer'>;

export interface RobotCustomizerScreenProps {
  onBack?: () => void;
  onSaveDone?: (settings: {
    expression: RobotExpression;
    mode: '3d' | 'avatar' | 'lottie';
    glowColor: string;
  }) => void;
}

export const useRobotCustomizer = (props?: RobotCustomizerScreenProps) => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();

  const [renderMode, setRenderMode] = useState<'3d' | 'avatar' | 'lottie'>('3d');
  const [expression, setExpression] = useState<RobotExpression>('smile');
  const [avatarSize, setAvatarSize] = useState<number>(140);
  const [selectedGlow, setSelectedGlow] = useState<string>(theme.colors.primary || '#10D0A7');

  const handleSaveDone = () => {
    if (props?.onSaveDone) {
      props.onSaveDone({
        expression,
        mode: renderMode,
        glowColor: selectedGlow,
      });
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleBack = () => {
    if (props?.onBack) {
      props.onBack();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return {
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
    onBack: handleBack,
  };
};

