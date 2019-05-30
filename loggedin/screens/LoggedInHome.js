/**
 * @flow
 *
 * The Logged In Home screen is a simple screen indicating that the user has logged in.
 */
import React from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from 'react-native-theme';
import { Actions } from 'react-native-router-flux';
import Screen from '../../ui/components/Screen';

import RNFirebaseLogo from '../../../../images/RNFirebase.png';

// const styles = StyleSheet.create({
//   image: {
//     height: 250,
//     width: 250,
//   },
//   welcome: {
//     alignItems: 'center',
//     flex: 1,
//     justifyContent: 'center',
//     padding: 24,
//   },
//   welcomeText: {
//     fontSize: 20,
//     marginTop: 24,
//     textAlign: 'center',
//   },
// });

export default class Home extends React.Component<*> {
  // Set the navigation options for `react-navigation`
  static navigationOptions = {
    headerTitle: 'Home',
    headerStyle: {
      backgroundColor: '#CEDCFF',
    },
  };

  componentWillMount() {
    Actions.mainApp();
  }

  render() {
    return (
      <Screen>
        <View style={styles.authLIHContainer}>
          <Image source={RNFirebaseLogo} style={styles.authLIHImage} />
          <Text style={styles.authLIHWelcomeText}>Logged in</Text>
        </View>
      </Screen>
    );
  }
}
