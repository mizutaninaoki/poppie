import { format, parseISO } from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import { ja } from 'date-fns/locale';

// import { Weekday } from '@/generated/graphql';

// export const DayNames: { [key in Weekday]: string } = {
//   [Weekday.Monday]: '月曜',
//   [Weekday.Tuesday]: '火曜',
//   [Weekday.Wednesday]: '水曜',
//   [Weekday.Thursday]: '木曜',
//   [Weekday.Friday]: '金曜',
//   [Weekday.Saturday]: '土曜',
//   [Weekday.Sunday]: '日曜',
// };

export const isOverlap = (
  start1: Date,
  end1: Date,
  start2: Date,
  end2: Date,
): boolean => {
  return start1 < end2 && end1 > start2;
};

/*
 * yyyy年MM月dd日 (ccc)
 */
export const formatDate = (date: string | Date, withDay = false): string => {
  const dateFormat = withDay ? 'yyyy年MM月dd日 (ccc)' : 'yyyy年MM月dd日';
  if (typeof date === 'object' && date instanceof Date) {
    return format(date, dateFormat, { locale: ja });
  }
  return format(new Date(date), dateFormat, { locale: ja });
};

/*
 * yyyy年MM月dd日 (ccc) HH:mm
 */
export const formatDateTime = (date: string | Date, withDay = false): string => {
  const dateFormat = withDay ? 'yyyy年MM月dd日 (ccc) HH:mm' : 'yyyy年MM月dd日 HH:mm';
  if (typeof date === 'object' && date instanceof Date) {
    return format(date, dateFormat, { locale: ja });
  }
  return format(new Date(date), dateFormat, { locale: ja });
};

/*
 * yyyy年MM月
 */
export const formatYearMonth = (date: string | Date): string => {
  const dateFormat = 'yyyy年MM月';
  if (typeof date === 'object' && date instanceof Date) {
    return format(date, dateFormat);
  }
  return format(new Date(date), dateFormat);
};

/*
 * d日 (ccc)
 */
export const formatDateWithDay = (date: string | Date): string => {
  const dateFormat = 'd日 (ccc)';
  if (typeof date === 'object' && date instanceof Date) {
    return format(date, dateFormat, { locale: ja });
  }
  return format(new Date(date), dateFormat, { locale: ja });
};

/*
 * 日本語の曜日（金曜 or 金）
 */
export const formatDay = (date: string | Date, onlyDay = false): string => {
  const suffix = onlyDay ? '' : '曜';
  const dateFormat = 'ccc';
  if (typeof date === 'object' && date instanceof Date) {
    return `${format(date, dateFormat, { locale: ja })}${suffix}`;
  }
  return `${format(new Date(date), dateFormat, { locale: ja })}${suffix}`;
};

/*
 * yyyy/MM/dd HH:mm
 */
export const formatDateTimeWithSlash = (dateString: string): string => {
  return format(new Date(dateString), 'yyyy/MM/dd HH:mm');
};

/*
 * yyyy/MM/dd
 */
export const formatDateWithSlash = (date: string | Date): string => {
  const dateFormat = 'yyyy/MM/dd';
  if (typeof date === 'object' && date instanceof Date) {
    return format(date, dateFormat);
  }
  return format(new Date(date), dateFormat);
};

/*
 * MM/dd
 */
export const formatShortDateWithSlash = (date: string | Date): string => {
  const dateFormat = 'M/d';
  if (typeof date === 'object' && date instanceof Date) {
    return format(date, dateFormat);
  }
  return format(new Date(date), dateFormat);
};

/*
 * dd
 */
export const formatOnlyDate = (date: string | Date): string => {
  const dateFormat = 'd';
  if (typeof date === 'object' && date instanceof Date) {
    return format(date, dateFormat);
  }
  return format(new Date(date), dateFormat);
};

/*
 * yyyy-MM-dd
 */
export const formatISO8601 = (date: string | Date): string => {
  const dateFormat = 'yyyy-MM-dd';
  if (typeof date === 'object' && date instanceof Date) {
    return format(date, dateFormat);
  }
  return format(new Date(date), dateFormat);
};

/*
 * yyyy-MM-dd
 */
export const formatISO8601WithTime = (date: string | Date): string => {
  const dateFormat = 'yyyy-MM-dd-HH-mm-ss';
  if (typeof date === 'object' && date instanceof Date) {
    return format(date, dateFormat);
  }
  return format(new Date(date), dateFormat);
};


/*
 * yyyy-MM
 */
export const formatYearMonthISO8601 = (date: string | Date): string => {
  const dateFormat = 'yyyy-MM';
  if (typeof date === 'object' && date instanceof Date) {
    return format(date, dateFormat);
  }
  return format(new Date(date), dateFormat);
};

/*
 * HH:mm
 */
export const formatTime = (date: string | Date): string => {
  const dateFormat = 'HH:mm';
  if (typeof date === 'object' && date instanceof Date) {
    return format(date, dateFormat);
  }
  return format(new Date(date), dateFormat);
};

/*
 * HH:mm - HH:mm
 */
export const formatTimeRange = (
  startDateString: string,
  endDateString: string,
): string => {
  if (startDateString == null || startDateString === '') return '';
  if (endDateString == null || endDateString === '') return '';

  return `${format(new Date(startDateString), 'HH:mm')} - ${format(
    new Date(endDateString),
    'HH:mm',
  )}`;
};

// 年齢を計算
export const getAge = (birthDate: Date): number => {
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

// 未成年か（引数はISO日付文字列）
export const isUnderAgedStr = (birthDate: string | Date): boolean => {
  if (typeof birthDate === 'object' && birthDate instanceof Date) {
    return getAge(birthDate) < 20;
  }
  const birthDateParsed = parseISO(birthDate);
  return getAge(birthDateParsed) < 20;
};
