import { z } from 'zod';

export const schemaForType =
  <T>() =>
  <S extends z.ZodType<T, any, any>>(arg: S) => {
    return arg;
  };

/**
 * zodのエラーメッセージマッピングをセットする
 * 参考：デフォルトのマッピング
 * https://github.com/colinhacks/zod/blob/f8217b8a9f08be6013a046fba15d271a9ba25cae/src/ZodError.ts#L252
 */
const customErrorMap: z.ZodErrorMap = (error, _ctx) => {
  let message: string;
  switch (error.code) {
    case z.ZodIssueCode.invalid_type:
      if (error.received === 'undefined' || error.received === 'null') {
        message = '入力してください';
      } else if (error.expected === 'string') {
        message = '文字を入力してください';
      } else if (error.expected === 'number' || error.expected === 'bigint') {
        message = '数字を入力してください';
      } else if (error.expected === 'date') {
        message = '日付を入力してください';
      } else {
        // ここに来るのはイレギュラーケース（バグ）の可能性が高い
        message = `Expected ${error.expected}, received ${error.received}`;
      }
      break;
    case z.ZodIssueCode.unrecognized_keys:
      message = '不正な入力です';
      break;
    case z.ZodIssueCode.invalid_union:
      message = '不正な入力です';
      break;
    case z.ZodIssueCode.invalid_enum_value:
      if (_ctx.data === null || _ctx.data === undefined) {
        message = '入力してください';
      } else {
        message = '不正な入力です';
      }
      break;
    case z.ZodIssueCode.invalid_arguments:
      message = '不正な関数です';
      break;
    case z.ZodIssueCode.invalid_return_type:
      message = '不正な返り値です';
      break;
    case z.ZodIssueCode.invalid_date:
      message = '不正な日付です';
      break;
    case z.ZodIssueCode.invalid_string:
      if (_ctx.data === '') {
        message = '入力してください';
      } else if (error.validation !== 'regex') {
        message = `不正な${error.validation}形式です`;
      } else {
        message = '不正な入力です';
      }
      break;
    case z.ZodIssueCode.too_small:
      if (error.type === 'array') {
        if (error.inclusive) {
          message = `${error.minimum}つ以上にしてください`;
        } else {
          message = `${error.minimum}つより多くしてください`;
        }
      } else if (error.type === 'string') {
        if (_ctx.data === '') {
          message = '入力してください';
        } else if (error.inclusive) {
          message = `${error.minimum}文字以上にしてください`;
        } else {
          message = `${error.minimum}文字より多くしてください`;
        }
      } else if (error.type === 'number') {
        if (error.inclusive) {
          message = `${error.minimum}以上にしてください`;
        } else {
          message = `${error.minimum}より多くしてください`;
        }
      } else {
        message = '不正な入力です';
      }
      break;
    case z.ZodIssueCode.too_big:
      if (error.type === 'array') {
        if (error.inclusive) {
          message = `${error.maximum}つ以下にしてください`;
        } else {
          message = `${error.maximum}つより少なくしてください`;
        }
      } else if (error.type === 'string') {
        if (error.inclusive) {
          message = `${error.maximum}文字以下にしてください`;
        } else {
          message = `${error.maximum}文字より少なくしてください`;
        }
      } else if (error.type === 'number') {
        if (error.inclusive) {
          message = `${error.maximum}以下にしてください`;
        } else {
          message = `${error.maximum}より少なくしてください`;
        }
      } else {
        message = '不正な入力です';
      }
      break;
    case z.ZodIssueCode.custom:
      message = '不正な入力です';
      break;
    case z.ZodIssueCode.invalid_intersection_types:
      message = '不正な入力です';
      break;
    default:
      message = _ctx.defaultError;
  }
  return { message };
};
z.setErrorMap(customErrorMap);
