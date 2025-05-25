/* GetAllCountriesTerritories.ts */
import type { NextApiRequest, NextApiResponse } from 'next'

const BASE_API_URL = 'https://ambiencelife-api-us.com/api/v1/data/destinations/subcontinent/'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    const { SubContinentParam } = req.query
    const API_URL = BASE_API_URL

    try {
        
        const response = await fetch(`${API_URL}${SubContinentParam}`)
        
        if (!response.ok) {
            res.status(response.status).json({ error: 'Failed to fetch data' })
            return
        }

        const data = await response.json()
        res.status(200).json(data)
    }
    
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Internal Server Error'
        res.status(500).json({ error: errorMessage })
    }
}