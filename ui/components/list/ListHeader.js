/**
 * @flow
 *
 * The ListHeader component can be used as a header in the list
 */
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from 'react-native-theme';

import * as Theme from '../../../theme';

/*
 * We use flow type to validate the Props of the component
 */
type Props = {
  // The text to display as the header
  text: string,
};

// const styles = StyleSheet.create({
//   header: {
//     backgroundColor: Theme.PRIMARY,
//     borderColor: Theme.BORDER_COLOR_DARK,
//     padding: 16,
//   },
//   headerText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '500',
//   },
// });

export default (props: Props) => {
  const { text } = props;
  return (
    <View style={styles.authListHeaderStyle}>
      <Text style={styles.authListHeaderText}>{text}</Text>
    </View>
  );
};
