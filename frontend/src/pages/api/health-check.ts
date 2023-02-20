import { NextApiRequest, NextApiResponse } from 'next';

/**
 * ALBのヘルスチェック用エンドポイント
 */
export default (req: NextApiRequest, res: NextApiResponse): void => {
  console.log('this is /api/health_check');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ status: 'ok' }));
};
