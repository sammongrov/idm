/**
 * @flow
 *
 * The TextField component displays a text field
 */
import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import type { FieldProps } from 'redux-form';
import { styles } from 'react-native-theme';

import Icon from '../Icon';
// import * as Theme from '../../../theme';

/*
 * We use flow type to validate the Props of the component
 */
type Props = {
  // The icon to display as part of the text field
  icon: string,
  // The props inherit from the built in `redux-form` FieldProps
} & FieldProps;

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     backgroundColor: '#f7f7f7',
//     borderColor: Theme.BORDER_COLOR,
//     borderRadius: 30,
//     borderWidth: StyleSheet.hairlineWidth,
//     flexDirection: 'row',
//     margin: 8,
//   },
//   containerError: {
//     borderColor: Theme.ERROR_COLOR,
//   },
//   icon: {
//     backgroundColor: 'transparent',
//     color: '#999',
//     fontSize: 18,
//     marginLeft: 16,
//     textAlign: 'center',
//     width: 24,
//   },
//   input: {
//     color: '#000',
//     flex: 1,
//     fontSize: 17,
//     lineHeight: 24,
//     height: 50,
//     marginLeft: 8,
//     marginRight: 16,
//   },
// });

export default class TextField extends React.Component<Props> {
  input: TextInput | null;

  /*
   * Expose a focus method to allow parent Components to focus the text field programmatically
   */
  focus = () => {
    if (this.input) this.input.focus();
  };

  render() {
    const {
      icon,
      label,
      input: { onChange, ...restInput },
      meta: { error, touched },
      textAreacontainerStyle,
      ...props
    } = this.props;

    return (
      <View style={styles.authTFContainer}>
        <Text style={styles.authTFLabelView}>{label}</Text>
        <View style={[styles.authTFView, touched && !!error && styles.authTFContainerError]}>
          {icon && <Icon active name={icon} style={styles.authTFIcon} />}
          <TextInput
            onChangeText={onChange}
            ref={(ref) => {
              this.input = ref;
            }}
            style={[styles.authTFInput, textAreacontainerStyle]}
            underlineColorAndroid="transparent"
            disableFullscreenUI
            autoCorrect={false}
            {...restInput}
            {...props}
          />
        </View>
      </View>
    );
  }
}
