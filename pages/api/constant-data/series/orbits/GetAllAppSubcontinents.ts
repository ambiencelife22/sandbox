/* GetAllAppSubcontinents.ts */
import type { NextApiRequest, NextApiResponse } from 'next'

const BASE_API_URL = 'https://ambiencelife-api-us.com/api/v1/data/travel/subcontinents/all'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const API_URL = BASE_API_URL

    try {
        const response = await fetch(API_URL)
        const data = await response.json()
        res.status(200).json(data)
    }

    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Internal Server Error'
        res.status(500).json({ error: errorMessage })
    }
}