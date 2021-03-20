export type RequestStatus = 'Pending' | 'InProgress' | 'Done';

interface IRequestStatuses {
  Pending: 'Pending';
  InProgress: 'InProgress';
  Done: 'Done';
}

export const REQUEST_STATUSES: IRequestStatuses = {
  Pending: 'Pending',
  InProgress: 'InProgress',
  Done: 'Done',
};
