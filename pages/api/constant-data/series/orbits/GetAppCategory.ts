/* GetAppCategory.ts */
import type { NextApiRequest, NextApiResponse } from 'next'

const API_URL = 'https://ambiencelife-api-us.com/api/v1/data/filter/category'

export default async (req: NextApiRequest, res: NextApiResponse) => {

    

    try {

        const keyfive = 'mwbebe'

        const apiUrlWithUrlHandle = `${API_URL}?urlHandle=${keyfive}`

        const response = await fetch(apiUrlWithUrlHandle)
        const data = await response.json()

        if (!data || !data.meta) {
            return res.status(400).json({ error: 'Data structure is not as expected' })
        }

        res.json(data)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch and process data.' })
    }
}