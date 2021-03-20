import React, { FC, memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { FONTS, RequestStatus } from '@constants';
import { formatRequestStatus, getRequestStatusColor } from '@utils';

interface IProps {
  status: RequestStatus;
}

const { regular, medium } = FONTS;

const RequestInfoStatus: FC<IProps> = ({ status }): JSX.Element => (
  <Text style={styles.label}>
    Статус:{'  '}
    <Text style={[styles.value, { color: getRequestStatusColor(status) }]}>
      {formatRequestStatus(status)}
    </Text>
  </Text>
);

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontFamily: regular,
  },
  value: {
    fontFamily: medium,
  },
});

export default memo(RequestInfoStatus);
