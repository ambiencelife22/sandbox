/* NeNConstants.ts */
import type { NextApiRequest, NextApiResponse } from 'next'

const API_URL = 'https://ambiencelife-api-us.com/api/v1/data/notebook/notebook/neverending'

type MetaEntry = {
    id: string
    neverendingNotebookKey: string
    neverendingNotebookPrompt: string
}

type MetaCategory = {
    [subcategory: string]: MetaEntry[]
}

type MetaData = {
    Meta: {
        [category: string]: MetaCategory
    }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const response = await fetch(API_URL!)
        const data: MetaData = await response.json()

        if (!data || !data.Meta) {
            return res.status(400).json({ error: 'Data structure is not as expected' })
        }

        res.json(data.Meta)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch and process data.' })
    }
}