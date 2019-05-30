import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';

import { styles } from 'react-native-theme';
import { Icon } from '@ui/components';

import FormError from '../../../ui/components/form/FormError';
import SubmitButton from '../../../ui/components/form/SubmitButton';
import TextField from '../../../ui/components/form/TextField';
import { isEmailValid, isNameValid, isPasswordValid } from '../../../util/validator';

class AuthRegister extends React.Component {
  state = {
    showPassword: false,
  };

  static defaultProps = {
    autoFocus: true,
    error: false,
    invalid: false,
    submitting: false,
  };

  focusEmailInput = () => {
    // Redux Form exposes a `getRenderedComponent()` method to get the inner TextField
    if (this.emailInput) this.emailInput.getRenderedComponent().focus();
  };

  focusPasswordInput = () => {
    // Redux Form exposes a `getRenderedComponent()` method to get the inner TextField
    if (this.passwordInput) this.passwordInput.getRenderedComponent().focus();
  };

  onSubmit = async (values) => {
    const { name, email, password } = values;
    const { registerSubmit } = this.props;
    registerSubmit(name, email, password);
  };

  render() {
    const {
      autoFocus,
      buttonText,
      error,
      handleSubmit,
      invalid,
      submitting,
      toggleRegister,
    } = this.props;
    const { showPassword } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.authPNFContainer}>
          <FormError error={error} />
          <Field
            autoCapitalize="none"
            autoFocus={autoFocus}
            component={TextField}
            keyboardType="email-address"
            name="name"
            onSubmitEditing={this.focusEmailInput}
            label="Name"
            ref={(ref) => {
              this.nameInput = ref;
            }}
            validate={isNameValid || isEmailValid}
            returnKeyType="next"
            withRef
          />
          <Field
            autoCapitalize="none"
            // autoFocus={autoFocus}
            component={TextField}
            keyboardType="email-address"
            name="email"
            onSubmitEditing={this.focusPasswordInput}
            label="Email"
            ref={(ref) => {
              this.emailInput = ref;
            }}
            validate={isNameValid || isEmailValid}
            returnKeyType="next"
            withRef
          />
          <View style={{ flex: 1 }}>
            <Field
              autoCapitalize="none"
              component={TextField}
              name="password"
              onSubmitEditing={handleSubmit(this.onSubmit)}
              label="Password"
              ref={(ref) => {
                this.passwordInput = ref;
              }}
              secureTextEntry={!showPassword}
              validate={isPasswordValid}
              withRef
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
                right: 25,
                bottom: 10,
              }}
              onPress={() => {
                this.setState({
                  // eslint-disable-next-line
                  showPassword: !this.state.showPassword,
                });
              }}
            >
              <Icon name="eye" type="material-community" color="#808080" size={24} />
            </TouchableOpacity>
          </View>
          <SubmitButton
            disabled={invalid && !error}
            loading={submitting}
            onPress={handleSubmit(this.onSubmit)}
            text={buttonText}
            containerStyle={[styles.marginHorizontal18, styles.marginTop20]}
          />
          <SubmitButton
            loading={submitting}
            onPress={toggleRegister}
            text="Go Back"
            containerStyle={[styles.marginHorizontal18, styles.marginTop20]}
          />
        </View>
      </View>
    );
  }
}

AuthRegister.propTypes = {
  autoFocus: PropTypes.bool,
  buttonText: PropTypes.string.isRequired,
  error: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  toggleRegister: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
};

// withNavigation ensures that the component has access to the navigation object
// reduxForm allows `redux-form` to manage the underlying form and its fields
export default reduxForm({
  form: 'AuthRegister',
})(AuthRegister);
