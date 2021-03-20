import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { ComplexHeader, SimpleHeader } from './components';

export interface IProps {
  mode?: 'simple' | 'complex';
  icon?: 'back' | 'close' | 'menu';
  avatar?: string;
  title?: string;
  helperText?: string;
  titleComponent?: JSX.Element;
  extraTitle?: JSX.Element;
  rightButton?: JSX.Element;
  borderBottom?: boolean;
  onPress?: () => void;
}

const Header: FC<IProps> = ({
  mode = 'simple',
  icon = 'back',
  avatar,
  title,
  helperText,
  titleComponent,
  extraTitle,
  rightButton,
  borderBottom = true,
  onPress,
}): JSX.Element => {
  const iconName = icon === 'back' ? 'arrow-back' : icon;

  const renderContent = (): JSX.Element => {
    if (mode === 'simple') {
      return (
        <SimpleHeader title={title} titleComponent={titleComponent} rightButton={rightButton} />
      );
    }

    return (
      <ComplexHeader
        title={title || ''}
        avatar={avatar}
        helperText={helperText || ''}
        extraTitle={extraTitle}
        rightButton={rightButton}
      />
    );
  };

  return (
    <View style={[styles.container, borderBottom && styles.borderBottom]}>
      <Ripple onPress={onPress} rippleContainerBorderRadius={24} style={styles.icon}>
        <Icon name={iconName} size={24} color='rgba(0,0,0,0.7)' />
      </Ripple>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingLeft: 8,
    paddingRight: 4,
    backgroundColor: '#FFF',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  icon: {
    padding: 8,
  },
});

export default memo(Header);
