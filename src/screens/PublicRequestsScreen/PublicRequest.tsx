import React, { FC, memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FONTS, THEME } from '@constants';
import { RequestModuleTypes } from '@types';
import { formatDate } from '@utils';
import _ from 'lodash';

const { regular, medium } = FONTS;
const { colors } = THEME;

interface IProps {
  data: RequestModuleTypes.IPublicRequest;
}

const PublicRequestList: FC<IProps> = ({ data }): JSX.Element => {
  const { need, category, createdAt } = data;
  const categoryName = _.get(category, 'name');

  return (
    <View style={styles.container}>
      <Text style={styles.category}>{categoryName}</Text>
      <Text style={styles.need}>{need}</Text>
      <Text style={styles.createdAt}>{formatDate(createdAt)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
  category: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    fontFamily: medium,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  need: {
    color: colors.text,
    fontSize: 16,
    fontFamily: regular,
    marginBottom: 12,
  },
  createdAt: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 14,
    fontFamily: regular,
  },
});

export default memo(PublicRequestList);
