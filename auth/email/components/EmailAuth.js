/**
 * @flow
 *
 * The EmailAuth component handles the email authentication flows for four cases:
 *
 * 1) Login
 * 2) Registration
 * 3) Linking
 * 4) Re-authentication
 *
 * It takes an email address, password and optional name field, passing them to firebase
 * before returning the user
 */
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import firebase from 'react-native-firebase';
import { withNavigation } from 'react-navigation';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import type { FormProps } from 'redux-form';
import { Actions } from 'react-native-router-flux';

import { Config } from '@mongrov/config';

import type { NavigationScreenProp } from 'react-navigation/src/TypeDefinition';
import { styles } from 'react-native-theme';

import FormError from '../../../ui/components/form/FormError';
import LinkButton from '../../../ui/components/LinkButton';
import SubmitButton from '../../../ui/components/form/SubmitButton';
import TextField from '../../../ui/components/form/TextField';
import { isEmailValid, isNameValid, isPasswordValid } from '../../../util/validator';

/*
 * We use flow type to validate the Props of the component
 */
type Props = {
  // Whether to autofocus the first field
  autoFocus?: boolean,
  // The text to show on the submit button
  buttonText: string,
  // Whether to show a name field (for registration)
  collectName?: boolean,
  navigation: NavigationScreenProp<*, *>,
  // An optional function called when the auth flow has succeeded
  onSuccess?: (Object, ?string) => any,
  // Whether to show the forgotten password link
  showForgottenPassword?: boolean,
  // The type of email authentication to perform
  type: 'link' | 'reAuth' | 'register' | 'signIn',
} & FormProps;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   forgottenPasswordContainer: {
//     alignSelf: 'flex-end',
//     marginBottom: 8,
//     marginRight: 8,
//   },
//   forgottenPasswordText: {
//     color: '#444',
//     fontSize: 13,
//   },
// });

class EmailAuth extends React.Component<Props> {
  emailInput: ?Field;
  passwordInput: ?Field;

  static defaultProps = {
    autoFocus: false,
    collectName: false,
    showForgottenPassword: false,
  };

  constructor() {
    super();
    // this.appDb = Dbmanager;
    // this.actionManager = this.appDb.actionManager;
  }

  componentWillMount() {
    const { type } = this.props;

    if (type === 'reAuth') {
      this.props.initialize({ email: firebase.auth().currentUser.email });
    }
  }

  componentDidMount = () => {};

  listnerCallback = (schema, changes) => {
    // console.log('LISTNER CALL SCHEMA', schema);
    // console.log('LISTNER CALL ACTION', changes);
    let action;
    changes.insertions.forEach((index) => {
      action = schema[index];
      if (action && action.status === Config.ACTIONSTATUS.SUCCESS) {
        this._performAction(action);
      }
    });

    changes.modifications.forEach((index) => {
      action = schema[index];
      if (action && action.status === Config.ACTIONSTATUS.SUCCESS) {
        // console.log('ACTIO ID ===', action._id);
        this._performAction(action);
      }
    });
  };

  _performAction = (action) => {
    switch (action._id) {
      case 'login':
        this._loginSuccess();
        break;

      default:
        return false;
    }
  };

  _loginSuccess = () => {
    Actions.mainApp();
  };

  render() {
    const {
      autoFocus,
      buttonText,
      collectName,
      error,
      handleSubmit,
      invalid,
      showForgottenPassword,
      submitting,
      type,
    } = this.props;

    return (
      <View
        style={styles.container}
        // keyboardDismissMode="interactive"
        // keyboardShouldPersistTaps="always"
        // style={styles.authEAContainer}
        // getTextInputRefs={() => {
        //   return [this.emailInput, this.passwordInput];
        // }}
      >
        <ScrollView keyboardShouldPersistTaps="handled" style={styles.authPNFContainer}>
          <FormError error={error} />
          {collectName && (
            <Field
              autoFocus={autoFocus}
              component={TextField}
              name="name"
              onSubmitEditing={this.focusEmailInput}
              label="Name"
              validate={isNameValid}
              returnKeyType="next"
            />
          )}
          <Field
            autoCapitalize="none"
            autoFocus={autoFocus && !collectName}
            component={TextField}
            editable={type !== 'reAuth'}
            keyboardType="email-address"
            name="email"
            onSubmitEditing={this.focusPasswordInput}
            label="Email address"
            ref={(ref) => {
              this.emailInput = ref;
            }}
            validate={isEmailValid}
            returnKeyType="next"
            withRef
          />
          <Field
            autoCapitalize="none"
            component={TextField}
            name="password"
            onSubmitEditing={handleSubmit(this.onSubmit)}
            label="Password"
            ref={(ref) => {
              this.passwordInput = ref;
            }}
            secureTextEntry
            validate={isPasswordValid}
            withRef
          />
          <SubmitButton
            disabled={invalid && !error}
            loading={submitting}
            onPress={handleSubmit(this.onSubmit)}
            text={buttonText}
            containerStyle={[styles.marginHorizontal18, styles.marginTop20]}
          />
          {showForgottenPassword && (
            <LinkButton
              containerStyle={styles.authEAForgottenPasswordContainer}
              onPress={this.onForgottenPassword}
              textStyle={styles.authEAForgottenPasswordText}
              text="Forgot your password?"
            />
          )}
        </ScrollView>
        {/* <View
          style={{
            backgroundColor: 'yellow',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          {collectName && (
            <LinkButton containerStyle={styles.authLOHLinkContainer} onPress={this.onLogin}>
              <Text style={styles.authEAForgottenPasswordText}>
                <Text style={styles.authLOHSignUpText}>Already have an account?</Text>
              </Text>
            </LinkButton>
          )}
          {!collectName && (
            <LinkButton containerStyle={styles.authLOHLinkContainer} onPress={this.onSignUp}>
              <Text style={styles.authEAForgottenPasswordText}>
                <Text style={styles.authLOHSignUpText}>Create an account</Text>
              </Text>
            </LinkButton>
          )}
        </View> */}
      </View>
    );
  }

  focusEmailInput = () => {
    // Redux Form exposes a `getRenderedComponent()` method to get the inner TextField
    if (this.emailInput) this.emailInput.getRenderedComponent().focus();
  };

  focusPasswordInput = () => {
    // Redux Form exposes a `getRenderedComponent()` method to get the inner TextField
    if (this.passwordInput) this.passwordInput.getRenderedComponent().focus();
  };

  onForgottenPassword = () => {
    // Navigates to the Forgotten Password screen
    this.props.navigation.navigate('ForgottenPassword');
  };

  onSignUp = () => {
    // Navigate to the SignUp screen
    this.props.navigation.navigate('SignUp');
  };

  onLogin = () => {
    // Navigate to the SignUp screen
    this.props.navigation.navigate('Login');
  };

  onSubmit = async (values: Object) => {
    const { email, name, password } = values;
    const { navigation, onSuccess, type } = this.props;

    try {
      let userCredential;
      if (type === 'link') {
        const { currentUser } = firebase.auth();
        if (!currentUser) {
          return;
        }
        const credential = firebase.auth.EmailAuthProvider.credential(email, password);
        userCredential = await currentUser.linkAndRetrieveDataWithCredential(credential);
      } else if (type === 'reAuth') {
        const { currentUser } = firebase.auth();
        if (!currentUser) {
          return;
        }
        const credential = firebase.auth.EmailAuthProvider.credential(email, password);
        userCredential = await currentUser.reauthenticateAndRetrieveDataWithCredential(credential);
      } else if (type === 'register') {
        userCredential = await firebase
          .auth()
          .createUserAndRetrieveDataWithEmailAndPassword(email, password);
      } else {
        // WIP code
        this.props.loginSubmit(email, password);

        // this.actionManager.action({
        //   action: 'login',
        //   args: { email, password },
        //   status: Config.ACTIONSTATUS.INTIATED,
        // });
        // navigation.navigate('mainApp');

        /* this.actionManager.addActionListener('_userAction', (schema, changes) => {
          // this.actionChange(schema, changes);
          // console.log('mohan schema', JSON.parse(JSON.stringify(schema)));
          console.log('mohan schema', schema[0].status);
          if (schema[0].status === Config.ACTIONSTATUS.SUCCESS) {
            navigation.navigate('mainApp');
          } else if (schema[0].status === Config.ACTIONSTATUS.FAILED) {
            const errMsg = JSON.parse(schema[0].result).message;
            alert(errMsg);
          }
          // console.log('mohan changes', changes);
        }); */

        // appDb.actionManager.action({
        //   action: 'updateProfile',
        //   args: { 'oldPassword':'!M37297469m', 'newPassword':'!m37297469M' },
        //   status: Config.ACTIONSTATUS.INTIATED,
        //   result: ''
        // });

        // userCredential = await firebase
        //   .auth()
        //   .signInAndRetrieveDataWithEmailAndPassword(email, password);
      }

      // if (onSuccess) onSuccess(userCredential.user, name);
    } catch (error) {
      if (type === 'link' && error.code === 'auth/requires-recent-login') {
        // If we're supporting re-authentication and the error indicates that re-authentication
        // is required, then show the ReAuthModal
        navigation.navigate('ReAuth');
      } else {
        // If there is an error, pass it back to `redux-form`
        throw new SubmissionError({ _error: error });
      }
    }
  };
}

// withNavigation ensures that the component has access to the navigation object
// reduxForm allows `redux-form` to manage the underlying form and its fields
export default withNavigation(
  reduxForm({
    form: 'EmailAuth',
  })(EmailAuth),
);
