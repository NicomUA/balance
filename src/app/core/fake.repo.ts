export const mockBuilder = (entityMock) => ({
  leftJoin: () => mockBuilder(entityMock),
  leftJoinAndSelect: () => mockBuilder(entityMock),
  relation: () => mockBuilder(entityMock),
  of: () => mockBuilder(entityMock),
  add: () => mockBuilder(entityMock),
  remove: () => mockBuilder(entityMock),
  where: () => mockBuilder(entityMock),
  delete: () => mockBuilder(entityMock),
  from: () => mockBuilder(entityMock),
  andWhere: () => mockBuilder(entityMock),
  select: () => mockBuilder(entityMock),
  cache: () => mockBuilder(entityMock),
  getOne: () => entityMock,
  getMany: () => [entityMock],
  insert: () => mockBuilder(entityMock),
  into: () => mockBuilder(entityMock),
  values: () => mockBuilder(entityMock),
  execute: () => mockBuilder(entityMock),
  returning: () => mockBuilder(entityMock),
  whereInIds: () => mockBuilder(entityMock),
});

export function fakeRepo<T>(entityName: string, entityMock: T) {
  return {
    provide: `${entityName}Repository`,
    useValue: {
      metadata: { columns: [], connection: { options: { type: '' } } },
      create: () => ({
        save: async () => entityMock,
      }),
      createQueryBuilder: () => mockBuilder(entityMock),
      save: async () => entityMock,
      findOne: async () => ({
        ...entityMock,
        save: async () => entityMock,
      }),
      findOneOrFail: async () => entityMock,
      update: async () => entityMock,
      cache: async () => entityMock,
      find: async () => [entityMock],
      findAndCount: async () => [entityMock, 1],
      count: async () => 0,
      delete: async () => jest.fn(),
      softDelete: async () => jest.fn(),
    },
  };
}
