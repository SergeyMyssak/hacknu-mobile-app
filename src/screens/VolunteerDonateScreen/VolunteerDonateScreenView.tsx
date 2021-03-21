import React, { FC, memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Header, RequestInfo, RequestUserInfo } from '@components';
import { FONTS } from '@constants';
import { DonateModuleTypes } from '@types';

const { regular } = FONTS;

interface IProps {
  data?: DonateModuleTypes.IDonate;
  isLoading: boolean;
  onPressRejectRequest: () => void;
  goBack: () => void;
}

const VolunteerDonateScreenView: FC<IProps> = ({
  data,
  isLoading,
  onPressRejectRequest,
  goBack,
}): JSX.Element => {
  if (!data) {
    return <Text>No data</Text>;
  }

  const { text, user } = data;

  return (
    <>
      <Header icon='back' title={text} onPress={goBack} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps='never'
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <RequestUserInfo data={user} />
        <RequestInfo data={data} />
        <>
          <Text style={[styles.helpText, styles.borderTop]}>
            Click on the button below if you want to refuse application
          </Text>
          <Button
            isRed={true}
            disabled={isLoading}
            loading={isLoading}
            onPress={onPressRejectRequest}
          >
            REFUSE
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

export default memo(VolunteerDonateScreenView);
