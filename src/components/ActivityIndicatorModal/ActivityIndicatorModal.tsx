import React, { FC, memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Modal } from '@components';
import { FONTS } from '@constants';

const { regular } = FONTS;

interface IProps {
  text: string;
}

const ActivityIndicatorModal: FC<IProps> = ({ text }): JSX.Element => (
  <Modal>
    <View style={styles.container}>
      <ActivityIndicator size='large' />
      <Text style={styles.text}>{text}</Text>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#FFF',
    borderRadius: 16,
  },
  text: {
    maxWidth: 100,
    marginTop: 16,
    fontSize: 10,
    fontFamily: regular,
    color: 'rgba(0, 0, 0, 0.6)',
    textAlign: 'center',
    lineHeight: 14,
  },
});

export default memo(ActivityIndicatorModal);
