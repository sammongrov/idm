import React from 'react';
import { View, Text, Modal, Image } from 'react-native';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';

import { styles } from 'react-native-theme';
import ProfImg from '../../../../images/profile.png';

import FormError from '../../../ui/components/form/FormError';
import SubmitButton from '../../../ui/components/form/SubmitButton';
import TextField from '../../../ui/components/form/TextField';
import { isEmailValid, isNameValid, isPasswordValid } from '../../../util/validator';
import Application from '../../../../constants/config';

class EmailAuthMg extends React.Component {
  static defaultProps = {
    autoFocus: true,
    error: false,
    invalid: false,
    submitting: false,
    errorMessage: null,
  };

  state = {
    loading: false,
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  focusPasswordInput = () => {
    // Redux Form exposes a `getRenderedComponent()` method to get the inner TextField
    if (this.passwordInput) this.passwordInput.getRenderedComponent().focus();
  };

  onSubmit = async (values) => {
    const { email, password } = values;
    const { loginSubmit } = this.props;
    this.setState({ loading: true }, () => this.setModalVisible(true));
    if (email && email !== '' && (password && password !== '')) {
      loginSubmit(email, password);
    }
  };

  onChangeField = () => {
    const { errorMessage, removeErrors } = this.props;
    if (errorMessage) {
      this.setState({ loading: false }, () => removeErrors());
    }
  };

  renderLoadingModal = () => {
    const { modalVisible } = this.state;
    return (
      <Modal transparent={true} visible={modalVisible}>
        <View style={styles.modalPrimaryContainer}>
          <View style={styles.modalSecondaryContainer}>
            {ProfImg && (
              <View style={styles.centerContainer}>
                <Image source={ProfImg} style={{ height: 100 }} resizeMode="contain" />
              </View>
            )}
            <View style={styles.centerContainer}>
              <Text style={styles.loadingInfoText}>Logging in...</Text>
            </View>
          </View>
        </View>
      </Modal>
    );
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
      errorMessage,
    } = this.props;
    const { loading } = this.state;
    const loadingState = loading && errorMessage === null;
    return (
      <View style={[styles.container]}>
        <View style={styles.authPNFContainer}>
          <FormError error={error} />
          <Field
            autoCapitalize="none"
            autoFocus={autoFocus}
            component={TextField}
            keyboardType="email-address"
            name="email"
            onSubmitEditing={this.focusPasswordInput}
            onChange={this.onChangeField}
            label="Email or username"
            ref={(ref) => {
              this.emailInput = ref;
            }}
            validate={isNameValid || isEmailValid}
            returnKeyType="next"
            withRef
          />
          <Field
            autoCapitalize="none"
            component={TextField}
            name="password"
            onSubmitEditing={handleSubmit(this.onSubmit)}
            onChange={this.onChangeField}
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
            containerStyle={[{ marginHorizontal: 15 }, styles.marginTop20]}
          />
          {Application.APPCONFIG.SHOW_REGISTER && (
            <SubmitButton
              // disabled={invalid && !error}
              loading={submitting}
              onPress={toggleRegister}
              text="Register"
              containerStyle={[styles.marginTop20, { marginHorizontal: 15 }]}
            />
          )}
        </View>
        {(loadingState && this.renderLoadingModal()) || null}
      </View>
    );
  }
}

EmailAuthMg.propTypes = {
  autoFocus: PropTypes.bool,
  buttonText: PropTypes.string.isRequired,
  error: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  toggleRegister: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  errorMessage: PropTypes.string,
  removeErrors: PropTypes.func.isRequired,
};
// withNavigation ensures that the component has access to the navigation object
// reduxForm allows `redux-form` to manage the underlying form and its fields
export default reduxForm({
  form: 'EmailAuthMg',
})(EmailAuthMg);
