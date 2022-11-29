import { NextApiRequest, NextApiResponse } from 'next';

const getUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { cookies } = req;

  if (cookies.currentUser) {
    res.status(200).json({ message: '成功!', body: cookies.currentUser });
  } else {
    res.status(400).json({ message: '尚未登入' });
  }
};

export default getUser;
