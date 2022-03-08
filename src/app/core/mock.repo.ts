import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

export const mockRepo = {
  metadata: { columns: [], connection: { options: { type: '' } } },
};

export const mockRepoProvider = (T) => ({
  provide: getRepositoryToken(T),
  useValue: mockRepo,
});

export const mockServiceProvider = (T) => ({
  provide: T,
  useValue: {},
});

export const mockConnection = {
  provide: Connection,
  useValue: {},
};

export const mockCoreServices = [];
