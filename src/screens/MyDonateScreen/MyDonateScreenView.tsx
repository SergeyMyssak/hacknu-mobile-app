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
import { DonateModuleTypes } from '@types';
import { isRequestInProgress, isRequestPending } from '@utils';

interface IProps {
  data?: DonateModuleTypes.IDonate;
  onUpdateDonate: () => void;
  onCloseDonatePress: () => void;
  goBack: () => void;
}

const { regular } = FONTS;

const MyDonateScreenView: FC<IProps> = ({
  onUpdateDonate,
  onCloseDonatePress,
  goBack,
  data,
}): JSX.Element => {
  if (!data) {
    return <Text>No data</Text>;
  }

  const { text, volunteer, status } = data;

  return (
    <>
      <Header icon='back' title={text} onPress={goBack} />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps='never'
        style={styles.container}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={styles.section}>
          <RequestInfoStatus status={status.name} />
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
            <Button onPress={onUpdateDonate}>EDIT</Button>
          </View>
        )}
        {isRequestInProgress(data) && (
          <>
            <Divider />
            <Text style={styles.helpText}>Click on the button below if help has been received</Text>
            <Button buttonStyle={styles.confirmBtn} onPress={onCloseDonatePress}>
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

export default memo(MyDonateScreenView);
