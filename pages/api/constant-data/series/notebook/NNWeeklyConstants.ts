/* NotebookNudgesWeekly.ts */

import type { NextApiRequest, NextApiResponse } from 'next'

const API_URL = 'https://ambiencelife-api-us.com/api/v1/data/notebook/nudges/weekly'

type Nudge = {
    id: number
    wjp_nudge: string
}

type WeeklyNudge = {
    [key: string]: Nudge[]
}

type NudgeData = {
    Weekly: WeeklyNudge[]
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const response = await fetch(API_URL!)
        const rawData: NudgeData = await response.json()

        let flatNudges: WeeklyNudge = {}
        rawData.Weekly.forEach((item: WeeklyNudge) => {
            Object.keys(item).forEach(key => {
                flatNudges[key] = item[key].map(nudge => {
                    return {
                        ...nudge,
                        wjp_nudge: nudge.wjp_nudge.replace(/^"|"$/g, '').replace(/&mdash;/g, '—')
                    }
                })
            })
        })

        res.json(flatNudges)
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch and process data.' })
    }
}
