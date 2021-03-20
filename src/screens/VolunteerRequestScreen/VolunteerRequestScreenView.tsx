import React, { FC, memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Header, RequestInfo, RequestUserInfo } from '@components';
import { FONTS } from '@constants';
import { RequestModuleTypes } from '@types';

const { regular } = FONTS;

interface IProps {
  data?: RequestModuleTypes.IRequest;
  isLoading: boolean;
  onPressRejectRequest: () => void;
  goBack: () => void;
}

const VolunteerRequestScreenView: FC<IProps> = ({
  data,
  isLoading,
  onPressRejectRequest,
  goBack,
}): JSX.Element => {
  if (!data) {
    return <Text>No data</Text>;
  }

  const { need, user } = data;

  return (
    <>
      <Header icon='back' title={need} onPress={goBack} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps='never'
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <RequestUserInfo data={user} />
        <RequestInfo data={data} />
        <>
          <Text style={[styles.helpText, styles.borderTop]}>
            Нажмите на кнопку ниже, если вы хотите отказаться от заявки
          </Text>
          <Button
            isRed={true}
            disabled={isLoading}
            loading={isLoading}
            onPress={onPressRejectRequest}
          >
            ОТКАЗАТЬСЯ
          </Button>
        </>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    padding: 16,
    paddingTop: 24,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  updateBtn: {
    marginBottom: 24,
  },
  status: {
    paddingVertical: 24,
  },
  volunteer: {
    paddingTop: 24,
  },
  helpText: {
    fontSize: 16,
    fontFamily: regular,
    paddingVertical: 24,
  },
});

export default memo(VolunteerRequestScreenView);
