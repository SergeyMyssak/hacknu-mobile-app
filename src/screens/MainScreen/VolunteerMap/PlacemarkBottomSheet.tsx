import React, { FC, memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BottomSheet, Button, RequestInfo, RequestUserInfo } from '@components';
import { AppState } from '@modules/reducers';
import { acceptRequestRequest } from '@modules/volunteerRequests';
import { RequestModuleTypes } from '@types';
import _ from 'lodash';

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

  if (_.isUndefined(data)) {
    return null;
  }

  const isMine =
    userInfo?.id === data?.volunteer?.id ||
    !!myRequests?.find((item: RequestModuleTypes.IRequest) => item.id === data?.id);

  const isLoading = acceptLoading.includes(data?.id || '');

  const onPress = (): void => {
    dispatch(acceptRequestRequest(data?.id));
  };

  const renderContent = (): JSX.Element => (
    <View style={styles.container}>
      <RequestInfo data={data} />
      <View style={styles.divider} />
      <RequestUserInfo data={data.user} />
      <Button
        disabled={isMine || isLoading}
        loading={isLoading}
        buttonStyle={styles.btn}
        onPress={onPress}
      >
        {isMine ? 'YOU ACCEPTED THE APPLICATION' : 'ACCEPT THE APPLICATION'}
      </Button>
    </View>
  );

  return (
    <BottomSheet
      innerRef={innerRef}
      title='INFORMATION'
      isVisible={true}
      renderContent={renderContent}
      enabledInnerScrolling={false}
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
    marginTop: 48,
  },
});

export default memo(PlacemarkBottomSheet);
