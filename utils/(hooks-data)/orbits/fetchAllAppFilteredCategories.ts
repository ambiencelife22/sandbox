/* fetchAllAppFilteredCategories.ts */
export const API_URL = '/api/constant-data/series/orbits/GetAllAppFilterCategories'

export const fetchFilterCategoryData = async (lastSegment: string) => {
    try {
        const response = await fetch(`${API_URL}?lastSegment=${lastSegment}`)
        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`)
        }
        const data = await response.json()
        return data
    }
    
    catch (error) {
        throw new Error(`Error fetching data: ${(error as Error).message}`)
    }
}