/* ActionIncorrectPiecesConstants.ts */
import type { NextApiRequest, NextApiResponse } from 'next'

const headers = {
    'Content-Type': 'application/json',
}

const ballparkURL = 'https://ambiencelife-api-us.com/api/v1/data'
const suffixURL = '/action/incorrect/pieces'

const API_URL = ballparkURL + suffixURL

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method !== 'POST') {
            return res.status(405).end()
        }

        const { ot } = req.body
        
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({ ot }),
            headers,
        })

        if (!response.ok) {
            return res.status(response.status).json({ error: 'Network response was not ok' })
        }

        const data = await response.json()
        const modifiedData = data.map((item: any) => ({ ...item, answer: 1 }))

        if (!modifiedData || modifiedData.length === 0) {
            return res.status(400).json({ error: 'Data structure is not as expected' })
        }

        res.status(200).json(modifiedData)
    }
    
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch and process data.' })
    }
}
