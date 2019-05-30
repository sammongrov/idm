/**
 * @flow
 *
 * The ForgottenPassword screen allows the user to reset their password.
 */
import React from 'react';
import firebase from 'react-native-firebase';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { View, Image, Platform, TouchableOpacity } from 'react-native';
import type { NavigationScreenProp } from 'react-navigation/src/TypeDefinition';
import type { FormProps } from 'redux-form';
import { Actions } from 'react-native-router-flux';
import { NavBar, Icon } from '@ui/components';
import { Colors } from '@ui/theme_default';
import { styles } from 'react-native-theme';

// import FormError from '../../../ui/components/form/FormError';
import { ErrorInfo } from '@ui/components';
import Screen from '../../../ui/components/Screen';
import SubmitButton from '../../../ui/components/form/SubmitButton';
import { showMessage } from '../../../ui/components/Toast';
import TextField from '../../../ui/components/form/TextField';
import IconButton from '../../../ui/components/IconButton';
import { isEmailValid } from '../../../util/validator';

/*
 * We use flow type to validate the Props of the component
 */
type Props = {
  navigation: NavigationScreenProp<*, *>,
} & FormProps;

class ForgottenPassword extends React.Component<Props> {
  // Set the navigation options for `react-navigation`
  // static navigationOptions = ({ navigation }) => ({
  //   headerTitle: 'Forgot password',
  //   headerStyle: {
  //     backgroundColor: '#efefef',
  //   },
  //   headerTitleStyle: {
  //     textAlign: 'center',
  //     fontFamily: 'OpenSans-Regular',
  //     fontSize: 18,
  //     fontWeight: '400',
  //     color: '#2E88FF',
  //   },
  //   headerLeft: (
  //     <IconButton
  //       icon="md-arrow-back"
  //       iconStyle={[styles.arrowBackWhite, styles.paddingLeft10, { color: '#2E88FF' }]}
  //       onPress={() => navigation.navigate('Login')}
  //     />
  //   ),
  // });

  /**
   * Called when the user submits the form.
   */
  onResetPassword = async (values: Object) => {
    const { email } = values;
    try {
      // 1) Tell firebase to send a password reset email
      await firebase.auth().sendPasswordResetEmail(email);
      // 2) Display an informational message
      showMessage("You'll receive an email with instructions shortly");
      // 3) Navigate back to the previous screen
      this.props.navigation.goBack();
    } catch (error) {
      // If there is an error, pass it back to `redux-form`
      throw new SubmissionError({ _error: error });
    }
  };

  render() {
    const { error, handleSubmit, invalid, submitting } = this.props;

    return (
      <Screen>
        <NavBar
          leftComponent={
            <TouchableOpacity onPress={Actions.pop}>
              <Icon
                name="chevron-left"
                type="material-community"
                color={Colors.NAV_ICON}
                size={36}
              />
            </TouchableOpacity>
          }
          titleText="Forgot password"
        />
        <View style={[styles.flex1, styles.passwordContainerSpacing]}>
          <ErrorInfo errorType="error" error={error} />
          <Field
            autoCapitalize="none"
            autoCorrect={false}
            autoFocus
            component={TextField}
            keyboardType="email-address"
            // icon="md-mail"
            name="email"
            onSubmitEditing={handleSubmit(this.onResetPassword)}
            // placeholder="Email"
            label="Email address"
            validate={isEmailValid}
          />
          <View>
            <SubmitButton
              disabled={invalid && !error}
              loading={submitting}
              onPress={handleSubmit(this.onResetPassword)}
              text="Reset password"
              containerStyle={[styles.marginHorizontal18, styles.marginTop20]}
            />
          </View>
        </View>
      </Screen>
    );
  }
}

// reduxForm allows `redux-form` to manage the underlying form and its fields
export default reduxForm({
  form: 'ForgottenPassword',
})(ForgottenPassword);
