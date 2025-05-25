import type { NextApiRequest, NextApiResponse } from 'next'

const BASE_API_URL = 'https://ambiencelife-api-us.com/api/v1/data/filter/category'


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { lastSegment } = req.query

    if (!lastSegment) {
        return res.status(400).json({ error: 'Missing lastSegment parameter' })
    }

    const API_URL = BASE_API_URL + '/' + lastSegment

    try {
        const response = await fetch(API_URL)
        const data = await response.json()

        if (!data || !data.meta) {
            return res.status(400).json({ error: 'Error importing the data' })
        }

        res.json(data)
    }
    
    catch (error: any) {
        console.log('Error occurred:', error)
        res.status(500).json({ error: error.message })
    }   
}
