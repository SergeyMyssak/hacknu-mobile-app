import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheet, Button, RequestInfo, RequestUserInfo } from '@components';
import { AppState } from '@modules/reducers';
import { acceptRequestRequest } from '@modules/volunteerRequests';
import { RequestModuleTypes } from '@types';

interface IProps {
  innerRef: any;
  data: RequestModuleTypes.IRequest;
  onClose: () => void;
  onCloseEnd: () => void;
}

const PlacemarkBottomSheet: FC<IProps> = ({
  innerRef,
  data,
  onClose,
  onCloseEnd,
}): JSX.Element | null => {
  const dispatch = useDispatch();

  const userInfo = useSelector(({ user }: AppState) => user.data);
  const { data: myRequests, acceptLoading } = useSelector(
    ({ volunteerRequests }: AppState) => volunteerRequests,
  );

  const renderContent = (): JSX.Element => {
    const isMine =
      userInfo?.id === data?.volunteer?.id ||
      !!myRequests?.find((item: RequestModuleTypes.IRequest) => item.id === data?.id);
    const isLoading = acceptLoading.includes(data?.id || '');

    const onPress = (): void => {
      dispatch(acceptRequestRequest(data?.id));
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
          {isMine ? 'YOU ACCEPTED REQUEST' : 'ACCEPT REQUEST'}
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
