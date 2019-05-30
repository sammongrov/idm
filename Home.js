import React, { Component } from 'react';
// import { GoogleSignin } from 'react-native-google-signin';
// import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

// import { GOOGLE_SIGN_IN_ANDROID_CLIENT_ID, GOOGLE_SIGN_IN_IOS_CLIENT_ID } from './config';
import Screen from './ui/components/Screen';
import LoadingModal from './ui/components/LoadingModal';
// import AppManager from '../manager/appManager/AppManager';
// Configure `react-native-google-signin` with our client IDs

// GoogleSignin.configure({
//   iosClientId: GOOGLE_SIGN_IN_IOS_CLIENT_ID,
//   webClientId: GOOGLE_SIGN_IN_ANDROID_CLIENT_ID,
// });

export default class Home extends Component {
  constructor(props) {
    super(props);
    // this.actionManager = Dbmanager.actionManager;
    this.state = {
      loading: false,
      // user: '',
      // userId: '',
      // server: {},
    };
  }

  componentWillMount() {
    Actions.Login();
  }

  componentDidMount() {
    // Commenting FireBase
    // this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
    //   this.setState({
    //     loading: false,
    //     user,
    //   });
    //   // FirebaseAnalytics: Tell Analytics who the user is, or clear if the user is logged out
    //   // We do this here as it's the central place we manage user state, rather than having to
    //   // add it to every login, logout and sign up action.
    //   firebase.analytics().setUserId(user ? user.uid : null);
    //   // console.log('authtest', this.state);
    //   if (user) {
    //     Actions.mainApp();
    //   } else {
    //     Actions.LoggedOut();
    //   }
    // });
  }

  componentWillUnmount() {
    // this.authSubscription();
  }

  render() {
    const { loading } = this.state;
    if (loading) return null;
    return (
      <Screen>
        <LoadingModal />
      </Screen>
    );
  }
}
