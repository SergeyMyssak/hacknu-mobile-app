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

  const renderAdditionalInfo = (): JSX.Element => (
    <>
      <View style={styles.detail}>
        <Text style={styles.detailLabel}>Status:</Text>
        <Text style={[styles.detailValue, { color: getRequestStatusColor(status) }]}>
          {formatRequestStatus(status)}
        </Text>
      </View>
      {volunteer && (
        <>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Organization:</Text>
            <Text style={styles.detailValue}>{volunteer?.organization.name}</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Volunteer:</Text>
            <Text numberOfLines={1} style={styles.detailValue}>
              {volunteer?.name}
            </Text>
          </View>
        </>
      )}
    </>
  );

  return (
    <Ripple style={[styles.container, isFirst && styles.first]} onPress={onRequestListItemPress}>
      <View style={styles.body}>
        <Text style={styles.need} numberOfLines={2}>
          {need}
        </Text>
        {mode === 'complex' && renderAdditionalInfo()}
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
    color: text,
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

export default memo(BigButton);
