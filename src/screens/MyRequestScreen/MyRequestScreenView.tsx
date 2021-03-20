import React, { FC, memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Header, RequestInfo, RequestInfoStatus, RequestVolunteerInfo } from '@components';
import { FONTS } from '@constants';
import { RequestModuleTypes } from '@types';

interface IProps {
  data?: RequestModuleTypes.IRequest;
  onUpdateRequest: () => void;
  onCloseRequestPress: () => void;
  goBack: () => void;
}

const { regular } = FONTS;

const MyRequestsInfoScreenView: FC<IProps> = ({
  onUpdateRequest,
  onCloseRequestPress,
  goBack,
  data,
}): JSX.Element => {
  if (!data) {
    return <Text>No data</Text>;
  }

  const { need, volunteer, status } = data;

  return (
    <>
      <Header icon='back' title={need} onPress={goBack} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps='never'
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <RequestInfo data={data} />
        {status === 'Pending' && (
          <View style={styles.updateBtn}>
            <Button onPress={onUpdateRequest}>Change</Button>
          </View>
        )}
        <View style={[styles.status, styles.borderTop]}>
          <RequestInfoStatus status={status} />
        </View>
        {volunteer && (
          <View style={[styles.volunteer, styles.borderTop]}>
            <RequestVolunteerInfo data={volunteer} />
          </View>
        )}
        {status === 'InProgress' && (
          <>
            <Text style={[styles.helpText, styles.borderTop]}>
              Click on the button below if help has been received
            </Text>
            <Button buttonStyle={styles.confirmBtn} onPress={onCloseRequestPress}>
              Help has been received
            </Button>
          </>
        )}
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 0,
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
  confirmBtn: {
    marginBottom: 24,
  },
});

export default memo(MyRequestsInfoScreenView);
