import { ResetMethod } from '../features/authentication/screens';

export type AuthStackParamList = {
  LetsIn: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPasswordMethods: undefined;
  OTPVerification: { method: ResetMethod };
  CreateNewPassword: undefined;
  FillProfile: undefined;
};

export type MainStackParamList = {
  WelcomeHome: undefined;
  ChatListHome: undefined;
  ActiveChat: { threadId?: string };
  EndedChats: undefined;
  RobotCustomizer: undefined;
};

export type RootStackParamList = {
  Onboarding: undefined;
  Auth: undefined;
  Main: undefined;
};
