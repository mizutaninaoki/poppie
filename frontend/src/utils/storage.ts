import { useState } from 'react';

export type TmpDealing = {
  id?: string | null | undefined;
  name: string; // 取引の確認画面にて名前を表示する際に使用
  amount: number;
  userId: string; // ポイントをあげるユーザーのID
  message: string;
};

type SessionStorage<T> = {
  data: T | null;
  save: (value: T) => void;
};

function useSessionStorage<T>(key: string): { data: T | null; save: (value: T) => void } {
  const [value, setValue] = useState<T | null>(() => {
    return JSON.parse(sessionStorage.getItem(key) || 'null') as T | null;
  });

  const saveFn = (saveValue: T) => {
    sessionStorage.setItem(key, JSON.stringify(saveValue));
    setValue(saveValue);
  };

  return { data: value, save: saveFn };
}

// セッションストレージをクリア
export function clearSession(): void {
  sessionStorage.clear();
}

// ポイント贈与
export function useTmpDealingCreateData(): SessionStorage<TmpDealing> {
  return useSessionStorage<TmpDealing>('tmpDealingCreateData');
}
