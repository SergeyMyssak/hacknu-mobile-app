import Snackbar from 'react-native-snackbar';
import { COLORS, FONTS, RequestStatus } from '@constants';
import { format, parseISO } from 'date-fns';
import { enGB } from 'date-fns/locale';
import _ from 'lodash';

const { regular } = FONTS;
const { primary, orange, green } = COLORS;

export const showSnackbar = (message: string): void =>
  Snackbar.show({ text: message, duration: Snackbar.LENGTH_LONG, fontFamily: regular });

export const formatError = (error: any, runSnackbar?: boolean): string => {
  const message: string = _.get<string>(
    error,
    'response.data.message',
    _.get(error, 'message', 'Unknown error'),
  );

  runSnackbar && showSnackbar(message);

  return message;
};

export const formatDate = (date: string) =>
  format(parseISO(date), 'dd MMMM yyyy HH:mm', { locale: enGB });

export const formatRequestStatus = (status: RequestStatus) => {
  switch (status) {
    case 'Pending':
      return 'Pending';
    case 'InProgress':
      return 'In progress';
    case 'Done':
      return 'Done';
  }
};

export const getRequestStatusColor = (status: RequestStatus) => {
  switch (status) {
    case 'Pending':
      return orange;
    case 'InProgress':
      return green;
    case 'Done':
      return primary;
  }
};
