/**
 * @flow
 *
 * The Screen component acts as a wrapper for all our screens so that any styles can be applied
 * consistently across all screens
 */
import React, { type Node } from 'react';
import { StyleSheet, View, SafeAreaView, Platform } from 'react-native';
import { styles } from 'react-native-theme';
import LinearGradient from 'react-native-linear-gradient';

import * as Theme from '../../theme';

/*
 * We use flow type to validate the Props of the component
 */
type Props = {
  // The children to display within the screen
  children: Node,
  safeBgColors: Array,
};

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: Theme.SCREEN_BACKGROUND_COLOR,
//     flex: 1,
//   },
// });

export default (props: Props) => {
  return (
    <LinearGradient
      colors={props.safeBgColors ? props.safeBgColors : ['#F5F5F5', '#FFF']}
      style={{ flex: 1 }}
      // locations={[0.5, 0.5]}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.authScreenContainer}>{props.children}</View>
      </SafeAreaView>
    </LinearGradient>
  );
};
