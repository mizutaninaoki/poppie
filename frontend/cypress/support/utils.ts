import { format } from 'date-fns';

/*
 * yyyyMMddHHmmss
 */
export const formatISO8601WithTime = (date: string | Date): string => {
  const dateFormat = 'yyyyMMddHHmmss';
  if (typeof date === 'object' && date instanceof Date) {
    return format(date, dateFormat);
  }
  return format(new Date(date), dateFormat);
};


/*
 * 8桁のランダムな整数を生成(03の後の電話番号を生成)
 */
export const randomEightDigitNumber = (): string => {
  const min = 100000000 ;
  const max = 999999999 ;
  const NUM = Math.floor( Math.random() * (max + 1 - min) ) + min ;
  const NUM2 = ( '' + NUM ).slice( -8);
  return NUM2;
};
