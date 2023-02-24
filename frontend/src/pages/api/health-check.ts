import { NextApiRequest, NextApiResponse } from 'next';

/**
 * ALBのヘルスチェック用エンドポイント
 */
export default (req: NextApiRequest, res: NextApiResponse): void => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ status: 'ok' }));
};
