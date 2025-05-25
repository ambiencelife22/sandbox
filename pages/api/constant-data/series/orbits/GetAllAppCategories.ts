/* GetAllAppCategories.ts */

import type { NextApiRequest, NextApiResponse } from 'next'

const API_URL = 'https://ambiencelife-api-us.com/api/v1/data/categories/all'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const response = await fetch(API_URL)
        const data = await response.json()

        if (!data || !data.meta) {
            return res.status(400).json({ error: 'Data structure is not as expected' })
        }

        res.json(data)
    }

    catch (error) {
        res.status(500).json({ error: 'Failed to fetch and process data.' })
    }
}


const BASE_API_URL = 'https://ambiencelife-api-us.com/api/v1/data/categories/all'

export const fetchCategoriesForParam = async (req: NextApiRequest, res: NextApiResponse) => {

    const activitiesCategoryParam = req.query.activitiesCategoryParam
    const API_URL = BASE_API_URL + activitiesCategoryParam

    try {
        const response = await fetch(API_URL)
        const data = await response.json()

        if (!data || !data.meta) {
            return res.status(400).json({ error: 'Data structure is not as expected' })
        }

        res.json(data)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch and process data.' })
    }
}
