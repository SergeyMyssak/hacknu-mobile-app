import React, { FC, memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';
import { COLORS, FONTS } from '@constants';
import { ICONS } from '@static';
import { DonateModuleTypes, RequestModuleTypes } from '@types';
import { formatDate, formatRequestStatus, getRequestStatusColor } from '@utils';

const { regular, medium } = FONTS;

interface IProps {
  data: RequestModuleTypes.IRequest | DonateModuleTypes.IDonate;
  isFirst: boolean;
  onPress: (data) => void;
}

const VolunteerBigButton: FC<IProps> = ({ data, isFirst, onPress }) => {
  // @ts-ignore
  const { need, text, status, createdAt } = data;
  const { name: statusName } = status;

  const onRequestListItemPress = (): void => onPress(data);

  return (
    <Ripple style={[styles.container, isFirst && styles.first]} onPress={onRequestListItemPress}>
      <View style={styles.body}>
        <Text style={styles.need} numberOfLines={2}>
          {need || text}
        </Text>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Status:</Text>
          <Text style={[styles.detailValue, { color: getRequestStatusColor(statusName) }]}>
            {formatRequestStatus(statusName)}
          </Text>
        </View>
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
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  need: {
    color: COLORS.text,
    fontFamily: regular,
    fontSize: 16,
    marginBottom: 16,
  },

  detail: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailLabel: {
    color: 'rgba(0,0,0,0.8)',
    fontSize: 14,
    fontFamily: regular,
    marginRight: 4,
  },
  detailValue: {
    color: 'rgba(0,0,0,0.8)',
    flex: 1,
    fontSize: 14,
    fontFamily: medium,
  },
  createdAt: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 14,
    fontFamily: regular,
  },
  icon: {
    height: 24,
    width: 24,
  },
});

export default memo(VolunteerBigButton);
