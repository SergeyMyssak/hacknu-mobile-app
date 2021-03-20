import React, { FC, memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Button,
  Divider,
  Header,
  RequestInfo,
  RequestInfoStatus,
  RequestVolunteerInfo,
} from '@components';
import { FONTS } from '@constants';
import { RequestModuleTypes } from '@types';
import { isRequestInProgress, isRequestPending } from '@utils';

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
        <View style={styles.section}>
          <RequestInfoStatus status={status} />
        </View>
        <Divider />
        {volunteer && (
          <>
            <View style={styles.volunteer}>
              <RequestVolunteerInfo data={volunteer} />
            </View>
            <Divider />
          </>
        )}
        <View style={styles.infoSection}>
          <RequestInfo data={data} />
        </View>
        {isRequestPending(data) && (
          <View style={styles.updateBtn}>
            <Button onPress={onUpdateRequest}>EDIT</Button>
          </View>
        )}
        {isRequestInProgress(data) && (
          <>
            <Divider />
            <Text style={styles.helpText}>Click on the button below if help has been received</Text>
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
  },
  updateBtn: {
    marginBottom: 24,
  },

  section: {
    paddingVertical: 24,
  },
  infoSection: {
    paddingTop: 24,
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
