import { FC } from 'react';
import { Alert, AlertType } from '@/components/common/Alert';
import { useFlash } from '@/hooks/useFlash';

export const Flash: FC = () => {
  const { flash, resetFlash } = useFlash();

  return (
    <Alert
      text={flash || ''}
      visible={flash !== undefined}
      type={AlertType.Success}
      onClose={resetFlash}
    />
  );
};
