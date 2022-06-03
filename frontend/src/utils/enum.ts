import { ItemStatusEnum } from '@/generated/graphql';

export const ItemStatusName = {
  [ItemStatusEnum.Public]: '公開',
  [ItemStatusEnum.Private]: '非公開',
} as const;
