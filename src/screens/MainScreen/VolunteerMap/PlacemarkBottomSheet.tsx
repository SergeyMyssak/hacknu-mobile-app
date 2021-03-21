import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheet, Button, RequestInfo, RequestUserInfo } from '@components';
import { VolunteerMapType } from '@constants';
import { AppState } from '@modules/reducers';
import { acceptDonateRequest } from '@modules/volunteerDonates';
import { acceptRequestRequest } from '@modules/volunteerRequests';
import { DonateModuleTypes, RequestModuleTypes } from '@types';
import { isVolunteerMapApplications, isVolunteerMapDonations } from '@utils';

interface IProps {
  innerRef: any;
  activeMode: VolunteerMapType;
  data: RequestModuleTypes.IRequest;
  onClose: () => void;
  onCloseEnd: () => void;
}

const PlacemarkBottomSheet: FC<IProps> = ({
  innerRef,
  activeMode,
  data,
  onClose,
  onCloseEnd,
}): JSX.Element | null => {
  const dispatch = useDispatch();

  const userInfo = useSelector(({ user }: AppState) => user.data);
  const { data: myRequests, acceptLoading: acceptLoadingRequests } = useSelector(
    ({ volunteerRequests }: AppState) => volunteerRequests,
  );

  const { data: myDonates, acceptLoading: acceptLoadingDonates } = useSelector(
    ({ volunteerDonates }: AppState) => volunteerDonates,
  );

  const renderContent = (): JSX.Element => {
    let isMine;
    let isLoading;

    if (isVolunteerMapApplications(activeMode)) {
      isMine =
        userInfo?.id === data?.volunteer?.id ||
        !!myRequests?.find((item: RequestModuleTypes.IRequest) => item.id === data?.id);
      isLoading = acceptLoadingRequests.includes(data?.id || '');
    } else {
      isMine =
        userInfo?.id === data?.volunteer?.id ||
        !!myDonates?.find((item: DonateModuleTypes.IDonate) => item.id === data?.id);
      isLoading = acceptLoadingDonates.includes(data?.id || '');
    }

    const onPress = (): void => {
      if (isVolunteerMapApplications(activeMode)) {
        dispatch(acceptRequestRequest(data?.id));
      } else {
        dispatch(acceptDonateRequest(data?.id));
      }
    };

    return (
      <View style={styles.container}>
        <RequestInfo data={data || {}} />
        <View style={styles.divider} />
        <RequestUserInfo data={data?.user || {}} />
        <Button
          disabled={isMine || isLoading}
          loading={isLoading}
          buttonStyle={styles.btn}
          onPress={onPress}
        >
          {isVolunteerMapApplications(activeMode)
            ? isMine
              ? 'YOU ACCEPTED REQUEST'
              : 'ACCEPT REQUEST'
            : isVolunteerMapDonations(activeMode)
            ? isMine
              ? 'YOU ACCEPTED DONATE'
              : 'ACCEPT DONATE'
            : ''}
        </Button>
      </View>
    );
  };

  return (
    <BottomSheet
      innerRef={innerRef}
      title='INFORMATION'
      snapPoint='50%'
      isVisible={!!data}
      renderContent={renderContent}
      enabledInnerScrolling={true}
      onClose={onClose}
      onCloseEnd={onCloseEnd}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'rgba(0,0,0,0.4)',
  },

  divider: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginBottom: 24,
  },
  btn: {
    marginTop: 36,
  },
});

export default memo(PlacemarkBottomSheet);
