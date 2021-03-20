import React, { FC, memo } from 'react';
import { ActivityIndicator as RNActivityIndicator, ActivityIndicatorIOSProps } from 'react-native';
import { THEME } from '@constants';

const { colors } = THEME;
const { primary } = colors;

const ActivityIndicator: FC<ActivityIndicatorIOSProps> = ({
  color = primary,
  ...props
}): JSX.Element => <RNActivityIndicator color={color} {...props} />;

export default memo(ActivityIndicator);
