import React, { FC, memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';
import { COLORS, FONTS } from '@constants';
import { ICONS } from '@static';
import { RequestModuleTypes } from '@types';
import { formatDate, formatRequestStatus, getRequestStatusColor } from '@utils';

const { text } = COLORS;
const { regular, medium } = FONTS;

interface IProps {
  data: RequestModuleTypes.IRequest;
  mode: 'simple' | 'complex';
  isFirst: boolean;
  onPress: (data: RequestModuleTypes.IRequest) => void;
}

const BigButton: FC<IProps> = ({ data, mode, isFirst, onPress }) => {
  const { need, status, createdAt, volunteer } = data;

  const onRequestListItemPress = (): void => onPress(data);

  const renderVolunteerData = (): JSX.Element | null => {
    if (!volunteer) {
      return null;
    }

    return (
      <>
        <Text style={styles.label}>
          Организация:{'  '}
          <Text style={styles.value}>{volunteer.organization.name}</Text>
        </Text>
        <Text style={styles.label}>
          Волонтер:{'  '}
          <Text style={styles.value}>{volunteer.name}</Text>
        </Text>
      </>
    );
  };

  const renderAddInfo = (): JSX.Element => (
    <>
      <Text style={styles.label}>
        Статус:{'  '}
        <Text style={[styles.value, { color: getRequestStatusColor(status) }]}>
          {formatRequestStatus(status)}
        </Text>
      </Text>
      {renderVolunteerData()}
    </>
  );

  return (
    <Ripple style={[styles.container, isFirst && styles.first]} onPress={onRequestListItemPress}>
      <View style={styles.body}>
        <Text style={styles.need} numberOfLines={2}>
          {need}
        </Text>
        {mode === 'complex' && renderAddInfo()}
        <Text style={styles.createdAt}>{formatDate(createdAt)}</Text>
      </View>
      <FastImage source={ICONS.chevronRight} style={styles.icon} />
    </Ripple>
  );
};

const styles = StyleSheet.create({
  first: {
    borderTopWidth: 1,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    width: '85%',
  },
  need: {
    color: text,
    fontFamily: regular,
    fontSize: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: regular,
    marginBottom: 6,
  },
  value: {
    fontFamily: medium,
  },
  createdAt: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: regular,
    color: 'rgba(0,0,0,0.6)',
  },
  icon: {
    height: 24,
    width: 24,
  },
});

export default memo(BigButton);
