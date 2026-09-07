import { useState } from 'react';
import { useTheme } from '../../../../hooks';
import { RobotExpression } from '../../../../shared/components';

export interface RobotCustomizerScreenProps {
  onBack?: () => void;
  onSaveDone?: (settings: {
    expression: RobotExpression;
    mode: 'avatar' | 'lottie';
    glowColor: string;
  }) => void;
}

export const useRobotCustomizer = (props: RobotCustomizerScreenProps) => {
  const theme = useTheme();

  const [renderMode, setRenderMode] = useState<'avatar' | 'lottie'>('avatar');
  const [expression, setExpression] = useState<RobotExpression>('smile');
  const [avatarSize, setAvatarSize] = useState<number>(140);
  const [selectedGlow, setSelectedGlow] = useState<string>(theme.colors.primary || '#00D2B4');

  const handleSaveDone = () => {
    props.onSaveDone?.({
      expression,
      mode: renderMode,
      glowColor: selectedGlow,
    });
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
    onBack: props.onBack,
  };
};
