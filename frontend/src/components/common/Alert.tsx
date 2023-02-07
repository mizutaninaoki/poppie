import { FC, Fragment, ReactNode } from 'react';
import { CgCloseO } from 'react-icons/cg';

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
    <div className="mx-4 md:mx-8 mt-4">
      <div className="alert alert-info shadow-md py-3 rounded-lg">
        <div className="w-full flex">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="text-white stroke-current flex-shrink-0 w-6 h-6 inline"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span className="font-bold text-white inline text-left">{message}</span>
          </div>
          <CgCloseO
            className="text-white cursor-pointer h-4 w-4 text-right ml-auto"
            onClick={() => onClose()}
          ></CgCloseO>
        </div>
      </div>
    </div>
  );
};
