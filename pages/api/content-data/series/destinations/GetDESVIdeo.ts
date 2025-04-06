/* GetDESVIdeo.ts */
import { NextApiRequest, NextApiResponse } from 'next'

import { getUserPoints } from '@/app/(libs)/helpers'

const API_URL = 'https://ambiencelife-api-us.com/api/v1/data/analytics/user/des-activity'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
      const { User, videoId, destinationsPoints, VideoCategory, CategoryToken, SuperCont } = req.body;
  
      const payload = {
        activity_type: 'watched',
        token: User.username,
        API_SESSION_TOKEN: User.APISessionToken,
        ITEM_ID: videoId,
        video_points: destinationsPoints,
        VideoCategory,
        CategoryToken,
        SuperCont,
      };
  
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to log user activity');
        }
  
        const data = await response.json();
        const history = JSON.stringify(data['history']);
        localStorage.setItem('seenit:des:v1', history);
  
        let userPoints = await getUserPoints(User.username);
        res.status(200).json({ DES_Points: userPoints['DES_Points'] });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
        res.status(500).json({ error: errorMessage });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  }