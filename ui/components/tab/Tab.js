/**
 * @flow
 *
 * The Tab component displays a tab button
 */
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from 'react-native-theme';

import Icon from '../Icon';

/*
 * We use flow type to validate the Props of the component
 */
type Props = {
  // Whether the tab is currently active / selected
  active: boolean,
  // The text to display within the tab
  heading: string,
  // The icon to display within the tab
  icon: string,
  // The action to call when the tab is pressed
  onPress: () => any,
};
export default (props: Props) => {
  const { active, heading, icon, onPress } = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.authTabContainer, active && styles.authTabContainerActive]}
    >
      <Icon name={icon} style={[styles.authTabIcon, active && styles.authTabIconActive]} />
      <Text style={[styles.authTabText, active && styles.authTabTextActive]}>{heading}</Text>
    </TouchableOpacity>
  );
};
