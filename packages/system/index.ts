import { IHttpService, IAuthService } from '@wface/ioc'
import TestLoginScreen from './test-login-screen';
import TestAuthService from './TestAuthService';

// Screens
import { TestScreen } from './src/test-screen';
import { TestScreen2 } from './src/test-screen2';

const config = {
  title: undefined,
  projectName: undefined,
  screenList: { 
    TestScreen,
    TestScreen2,
  },  
  loginScreen: null,
  authServiceType: null,  
};

export default config;