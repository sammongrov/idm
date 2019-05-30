/**
 * @flow
 *
 * The SignUp screen allows the user to sign up.  It is made up of two tabs:
 *
 * 1) Email Sign Up
 * 2) Phone Sign Up
 *
 * And a third block handling Social Sign Up.
 */
import React from 'react';
import { View, Image, Platform, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { NavBar, Icon } from '@ui/components';

import EmailSignUp from '../../email/components/EmailSignUp';
import PhoneSignUp from '../../phone/components/PhoneSignUp';
import Screen from '../../../ui/components/Screen';
// import SocialLogin from '../../social/components/SocialLogin';
import IconButton from '../../../ui/components/IconButton';
import Tabs from '../../../ui/components/tab/Tabs';
import Tab from '../../../ui/components/tab/Tab';
import { styles } from 'react-native-theme';
import { Colors } from '@ui/theme_default';
/*
 * We use flow type to validate the State of the component
 */
type State = {
  // The currently selected tab
  selected: 'email' | 'phone',
};

export default class SignUp extends React.Component<*, State> {
  // Set the navigation options for `react-navigation`
  // static navigationOptions = ({ navigation }) => ({
  //   headerTitle: 'Sign up',
  //   headerStyle: {
  //     backgroundColor: '#EFEFEF',
  //   },
  //   headerTitleStyle: {
  //     fontFamily: 'OpenSans-Regular',
  //     fontSize: 18,
  //     fontWeight: '400',
  //     color: '#2E88FF',
  //     paddingLeft: Platform.OS === 'ios' ? 0 : 70,
  //   },
  //   headerLeft: (
  //     <IconButton
  //       icon="md-arrow-back"
  //       iconStyle={[styles.arrowBackWhite, styles.paddingLeft10, { color: '#2E88FF' }]}
  //       onPress={() => navigation.navigate('Login')}
  //     />
  //   ),
  // });

  constructor(props, context) {
    super(props, context);
    this.state = {
      selected: 'email',
    };
  }

  /**
   * Select the email tab
   */
  selectEmail = () => {
    this.setState({ selected: 'email' });
  };

  /**
   * Select the phone tab
   */
  selectPhone = () => {
    this.setState({ selected: 'phone' });
  };

  render() {
    const { selected } = this.state;
    return (
      <Screen>
        {/* <View
          style={{
            paddingTop: 20,
            paddingBottom: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image style={styles.brandLogo_auth} source={BrandLogo} />
        </View> */}
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
          titleText="Sign up"
        />
        <Tabs>
          <Tab
            active={selected === 'email'}
            heading="Email"
            icon="md-mail"
            onPress={this.selectEmail}
          />
          <Tab
            active={selected === 'phone'}
            heading="Phone"
            icon="md-call"
            onPress={this.selectPhone}
          />
        </Tabs>
        {selected === 'email' && <EmailSignUp />}
        {selected === 'phone' && <PhoneSignUp />}
        {/* <SocialLogin title="Sign up with your social account" /> */}
      </Screen>
    );
  }
}
