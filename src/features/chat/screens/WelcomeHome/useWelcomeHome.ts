import { useTheme } from '../../../../hooks';

export interface UseWelcomeHomeProps {
  userName?: string;
  botName?: string;
  isOnline?: boolean;
  onNewChat?: () => void;
  onCustomizeRobot?: () => void;
  onOpenMenu?: () => void;
}

export const useWelcomeHome = ({
  userName = 'Andrew',
  botName = 'Synapse AI',
  isOnline = true,
  onNewChat,
  onCustomizeRobot,
  onOpenMenu,
}: UseWelcomeHomeProps) => {
  const theme = useTheme();

  return {
    theme,
    userName,
    botName,
    isOnline,
    onNewChat,
    onCustomizeRobot,
    onOpenMenu,
  };
};
