/* GetAllAppDestinations.ts */
import { NextApiRequest, NextApiResponse } from 'next'

const API_URL = 'https://ambiencelife-api-us.com/api/v1/data/destinations/area/'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { CountryTerritoryParam } = req.query // Assuming you'll pass the parameter as a query string

    try {
        const response = await fetch(API_URL + `${CountryTerritoryParam}`)
        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`)
        }
        const data = await response.json()
        res.status(200).json(data)
    }
    
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Internal Server Error'
        res.status(500).json({ error: errorMessage })
    }
}