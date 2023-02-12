import { Statuses } from '@/generated/graphql';

export const ItemStatusName = {
  [Statuses.Public]: '公開',
  [Statuses.Private]: '非公開',
} as const;
