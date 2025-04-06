/* fetchAllAppStatesCities.ts */

import { API_URL } from '@/pages/api/constant-data/series/orbits/CityStatesFilterAPI'

export const fetchStatesCitiesData = async (StatesCitiesParam: any) => {


    const response = await fetch(API_URL + `${StatesCitiesParam}`)
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data
}
