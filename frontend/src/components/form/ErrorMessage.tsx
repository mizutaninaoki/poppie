import { FC } from "react";
type Props = {
  errMsg: string;
};

export const ErrorMessage: FC<Props> = ({ errMsg }) => (
  <p className="text-red-500 text-xs italic">{errMsg}</p>
);
