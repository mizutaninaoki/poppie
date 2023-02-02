import { FC, Fragment, ReactNode } from 'react';
import { XCircleIcon } from '@heroicons/react/solid';

import styles from './Alert.module.scss';

export const AlertType = {
  Success: 'success',
  Error: 'error',
} as const;
type AlertType = typeof AlertType[keyof typeof AlertType];

export type AlertProps = {
  text: string;
  visible: boolean;
  onClose: () => void;
  type?: AlertType;
};

export const Alert: FC<AlertProps> = ({
  text,
  visible,
  onClose,
  type = AlertType.Success,
}) => {
  if (!visible) return null;

  let message: ReactNode = null;
  message = text
    ? text.split('\n').map((str) => {
        return (
          <Fragment key={`error-${str}`}>
            {str}
            <br />
          </Fragment>
        );
      })
    : null;

  return (
    <div className="mx-8 mt-4">
      <div className="alert alert-info shadow-md py-3 rounded-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="text-white stroke-current flex-shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span className="font-bold text-white">{message}</span>
        </div>
        <XCircleIcon
          className="h-5 w-5 text-blue-500 text-right cursor-pointer"
          onClick={() => onClose()}
        />
      </div>
    </div>
  );
};
