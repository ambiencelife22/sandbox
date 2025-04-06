/* fetchAllAppCategories.ts */
export const fetchAllAppCategories = async (): Promise<any> => {
  try {
    // const response = await fetch('/api/constant-data/series/orbits/GetAllAppCategories')
    const response = await fetch('https://ambiencelife-api-us.com/api/v1/data/categories/all')
    if (!response.ok) {
      throw new Error('Failed to fetch data from API.')
    }
    return await response.json()
  }

  catch (error) {
    console.error('Error fetching data:', error)
    return null
  }
}
