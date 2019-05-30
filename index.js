/**
 * Falconz Identity Manager
 */

import Home from './Home';
import Login from './auth/core/screens/Login';
import ForgottenPassword from './auth/email/screens/ForgottenPassword';
import SignUp from './auth/core/screens/SignUp';
import Profile from './loggedin/screens/Profile';

import ChangeEmail from './auth/email/screens/ChangeEmail';
import ChangePassword from './auth/email/screens/ChangePassword';
import LinkEmail from './auth/email/screens/LinkEmail';
import LinkPhone from './auth/phone/screens/LinkPhone';
import ReAuthScreen from './auth/core/screens/ReAuthScreen';

import uiReducer from './ui/redux/uiReducer';

export {
  Home,
  Login,
  ForgottenPassword,
  SignUp,
  Profile,
  ChangeEmail,
  ChangePassword,
  LinkEmail,
  LinkPhone,
  ReAuthScreen,
  uiReducer,
};
