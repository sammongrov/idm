/**
 * @flow
 *
 * The Login screen allows the user to login.  It is made up of two tabs:
 *
 * 1) Email Login
 * 2) Phone Login
 *
 * And a third block handling Social Login.
 */
import React from 'react';
import { View, Image, BackHandler, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styles } from 'react-native-theme';
import { Colors } from '@ui/theme_default';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import FastImage from 'react-native-fast-image';
import { Actions } from 'react-native-router-flux';

import { Screen, Text, BaseListenerComponent, Button } from '@ui/components';
import { DBManager } from 'app-module';

import EmailAuthMg from '../../email/components/EmailAuthMg';
import AuthRegister from '../../email/components/AuthRegister';
// import DBManager from '../../../../app/DBManager';
import ProfImg from '../../../../../../src/images/profile.png';
//import Application from '../../../../constants/config';
import { Config } from '@mongrov/config';

export default class Login extends BaseListenerComponent {
  constructor(props) {
    super(props);
    // this.loginStatus(this.loginStatusChange);
    // this.showErrors(this.showErrorsView);
    this._mounted = false;
    this._insideStateUpdate = false;
    this.safeBgColors = this.props.safeBgColors;
    this.headerCurve = this.props.headerCurve;
    this.brandLogo = this.props.brandLogo;
    this.changeServer = this.props.changeServer;
    this.serverUrl = DBManager.app.app.host;
    // Set the default state
    this.state = {
      selected: 'email',
      loading: true,
      error: null,
      register: false,
      toggleRegister: false,
    };
  }

  componentWillMount() {
    // remove previous Login errors from Realm
    this.removeErrorsInDb();
    if (this.state.loading) {
      this.setState({ loading: false });
    }
  }

  componentDidMount = () => {
    // console.log('viswanth', this.dbvalue)
    this._mounted = true;
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  };

  componentWillUnmount = () => {
    this.removeListeners();
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    this._mounted = false;
  };

  onBackPress = () => {
    const { toggleRegister } = this.state;
    if (toggleRegister) {
      this.setState({
        toggleRegister: false,
      });
      return true;
    }
    if (!toggleRegister) {
      BackHandler.exitApp();
    }
  };

  loginStatusChange = (userId) => {
    if (this._mounted) {
      if (userId) {
        this.props.onLoggedIn();
      } else if (!this._insideStateUpdate) {
        this._insideStateUpdate = true;
        this.setState(
          {
            loading: false,
          },
          () => {
            this._insideStateUpdate = false;
          },
        );
      }
    }
  };

  showErrorsView = (err) => {
    if (this._mounted && !this._insideStateUpdate) {
      this._insideStateUpdate = true;
      this.setState(
        {
          error: err,
          loading: false,
        },
        () => {
          this._insideStateUpdate = false;
        },
      );
    }
    // this.setState({ error: err });
  };

  toggleRegister = () => {
    const { toggleRegister } = this.state;
    if (this._mounted && !this._insideStateUpdate) {
      this._insideStateUpdate = true;
      this.setState(
        {
          toggleRegister: !toggleRegister,
        },
        () => {
          this._insideStateUpdate = false;
        },
      );
    }
  };

  removeErrors() {
    if (this._mounted && !this._insideStateUpdate) {
      this._insideStateUpdate = true;
      this.setState(
        {
          error: null,
          loading: false,
        },
        () => {
          this._insideStateUpdate = false;
        },
      );
    }
  }

  /**
   * Select the email tab
   */
  selectEmail = () => {
    if (!this._insideStateUpdate) {
      this._insideStateUpdate = true;
      this.setState({ selected: 'email' }, () => {
        this._insideStateUpdate = false;
      });
    }
  };

  /**
   * Select the phone tab
   */
  selectPhone = () => {
    if (!this._insideStateUpdate) {
      this._insideStateUpdate = true;
      this.setState({ selected: 'phone' }, () => {
        this._insideStateUpdate = false;
      });
    }
  };

  renderAlert = () => {
    if (this.state.error) {
      return (
        <View style={[styles.loginErrorMessage]}>
          <Text style={styles.errorText}>{this.state.error}</Text>
        </View>
      );
    }
  };

  render() {
    // performance in firebase to log - screen name !!!
    const { loading, toggleRegister, error } = this.state;
    // const {  } = this.state;
    if (loading || this.props.isRegister) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image source={ProfImg} style={{ height: 200 }} resizeMode="contain" />
            {!error && (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 70,
                  paddingVertical: 15,
                }}
              >
                <ActivityIndicator size="large" color={Colors.PRIMARY} />
                <Text style={[styles.authTFLabelView, { textAlign: 'center' }]}>
                  Setting up your profile
                </Text>
              </View>
            )}
            {error && (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 15,
                }}
              >
                {this.renderAlert()}
                <Button
                  title="Try again"
                  onPress={() => Actions.CertListScene({ type: 'replace' })}
                  color={Colors.BG_BTN}
                  buttonStyle={[styles.serverConfirmButton, { paddingHorizontal: 20 }]}
                  containerStyle={[styles.marginTop15]}
                />
              </View>
            )}
          </View>
        </View>
      );
    }
    return (
      <Screen safeBgColors={this.safeBgColors}>
        <KeyboardAwareScrollView
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          {/* <View style={styles.whiteBackground}>
            <Image style={styles.loginHeaderCurve} source={this.headerCurve} resizeMode="stretch" />
          </View> */}
          <View style={[styles.loginBrandLogoView, styles.alignJustifyCenter]}>
            {!Config.APPCONFIG.CHANGE_SERVER && (
              <Image
                source={Config.logo}
                style={{ width: 200, height: 100 }}
                resizeMode="contain"
              />
            )}
            {Config.APPCONFIG.CHANGE_SERVER && (
              <FastImage
                style={{ width: 200, height: 100 }}
                source={{
                  uri: `https://${DBManager.app.app.host}/assets/logo.png`,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
            )}
            {Config.APPCONFIG.CHANGE_SERVER && (
              <TouchableOpacity
                style={styles.loginServerChangeContainer}
                onPress={() => {
                  if (Actions.currentScene === 'Login') {
                    this.changeServer();
                  }
                }}
              >
                <Text style={[styles.cListLastMessage]}>Workspace</Text>
                <Text style={[styles.subtext]}>{DBManager.app.app.host}</Text>
              </TouchableOpacity>
            )}
            {!Config.APPCONFIG.CHANGE_SERVER &&
              !Config.APPCONFIG.HIDE_WORKSPACE_VIEW && (
                <View>
                  <Text style={[styles.cListLastMessage]}>
                    {' '}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Workspace
                  </Text>
                  <Text style={[styles.subtext]}>{DBManager.app.app.host}</Text>
                </View>
              )}
          </View>
          {this.renderAlert()}
          {!toggleRegister && (
            <EmailAuthMg
              buttonText="Login"
              type="signIn"
              toggleRegister={this.toggleRegister}
              errorMessage={error}
              removeErrors={() => this.removeErrorsInDb()}
              {...this.props}
            />
          )}
          {toggleRegister && (
            <AuthRegister
              buttonText="Register"
              type="signIn"
              toggleRegister={this.toggleRegister}
              {...this.props}
            />
          )}
          <TouchableOpacity
            style={[styles.paddingBottom60, { justifyContent: 'center', alignItems: 'center' }]}
            onPress={() => {
              Actions.disclaimer();
            }}
          >
            {!toggleRegister && (
              <Text style={styles.baseFontFamily}>By logging in you are agreeing to the</Text>
            )}
            {toggleRegister && (
              <Text style={styles.baseFontFamily}>By registering you are agreeing to the</Text>
            )}
            <Text style={[styles.cwLoginText, styles.baseFontFamily]}>Terms and Conditions.</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </Screen>
    );
  }
}
