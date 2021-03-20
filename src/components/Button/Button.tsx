import React, { FunctionComponent, memo } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { COLORS, FONTS } from '@constants';

interface IProps {
  disabled?: boolean;
  loading?: boolean;
  backgroundColor?: string;

  children?: string;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  isRed?: boolean;

  onPress?: () => void;
}

const { primary, primary_04, btn_color, error, error_04 } = COLORS;
const { medium } = FONTS;

const Button: FunctionComponent<IProps> = ({
  disabled,
  children,
  loading,

  buttonStyle,
  buttonTextStyle,
  isRed,

  onPress,
}): JSX.Element => (
  <Ripple
    rippleColor='#FFF'
    rippleContainerBorderRadius={4}
    disabled={disabled}
    style={[
      styles.button,
      {
        backgroundColor: isRed ? (disabled ? error_04 : error) : disabled ? primary_04 : primary,
      },
      buttonStyle,
    ]}
    onPress={onPress}
  >
    <>
      <Text style={[styles.buttonText, buttonTextStyle]}>{children?.toUpperCase()}</Text>
      {loading && <ActivityIndicator color='#FFF' size={24} style={styles.activityIndicator} />}
    </>
  </Ripple>
);

const styles = StyleSheet.create({
  button: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: btn_color,
    fontSize: 14,
    fontFamily: medium,
  },
  disabledStyles: {
    backgroundColor: 'rgba(222, 52, 47, 0.3)',
  },
  activityIndicator: {
    marginLeft: 12,
  },
});

export default memo(Button);
