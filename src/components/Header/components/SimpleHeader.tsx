import React, { FC, memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FONTS } from '@constants';

const { medium } = FONTS;

interface IProps {
  title?: string;
  titleComponent?: JSX.Element;
  rightButton?: JSX.Element;
}

const SimpleHeader: FC<IProps> = ({ title, titleComponent, rightButton }): JSX.Element => (
  <View style={styles.container}>
    {title && (
      <Text numberOfLines={1} style={styles.title}>
        {title}
      </Text>
    )}
    {!!titleComponent && titleComponent}
    {!!rightButton && rightButton}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 22,
    marginRight: 6,
  },
  title: {
    flex: 1,
    color: 'rgba(0,0,0,0.8)',
    fontSize: 18,
    fontFamily: medium,
    marginTop: -2,
  },
});

export default memo(SimpleHeader);
