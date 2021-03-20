import { RequestModuleTypes, UserModuleTypes } from '@types';
import uuid from 'uuid';

import { CATEGORIES } from './app';

const USER: UserModuleTypes.IUser = {
  id: uuid.v4(),
  phone: '+7 777 777 7777',
  name: 'USER NAME',
  role: {
    id: 1,
    name: 'User',
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const VOLUNTEER: UserModuleTypes.IVolunteer = {
  id: uuid.v4(),
  phone: '+7 777 777 7777',
  name: 'Константинов Константин Констанинопольский',
  role: {
    id: 2,
    name: 'Volunteer',
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  organization: {
    id: uuid.v4(),
    name: 'Red Cross',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

const generateRequest = ({ status, hasVolunteer }): RequestModuleTypes.IRequest => ({
  id: uuid.v4(),
  address: '1 May 26',
  need: 'Test',
  problem: 'Test',
  longitude: '71.430411',
  latitude: '51.128207',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  status,
  user: USER,
  category: CATEGORIES[0],
  volunteer: hasVolunteer ? VOLUNTEER : undefined,
});

export const REQUESTS: RequestModuleTypes.IRequest[] = [
  generateRequest({ status: 'Pending', hasVolunteer: false }),
  generateRequest({ status: 'InProgress', hasVolunteer: true }),
  generateRequest({ status: 'Done', hasVolunteer: true }),
];
