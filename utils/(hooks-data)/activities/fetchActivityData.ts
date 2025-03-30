/* fetchActivityData.ts */

const headers = {
  'Content-Type': 'application/json',
}

// Function to fetch the correct action data
export const fetchActionCorrectElementsData = async (ot: string) => {
  try {
    const response = await fetch('/api/constant-data/series/activities/ActionCorrectElementsConstants', {
      method: 'POST',
      body: JSON.stringify({ ot }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Network response from Local API was not ok')
    }

    return await response.json()
  }
  
  catch (error) {
    throw error
  }
}


// Function to fetch the incorrect action data
export const fetchActionIncorrectElementsData = async (ot: string) => {
  try {
    const response = await fetch('/api/constant-data/series/activities/ActionIncorrectElementsConstants', {
      method: 'POST',
      body: JSON.stringify({ ot }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Network response from Local API was not ok')
    }

    return await response.json()
  }
  
  catch (error) {
    throw error
  }
}

// Function to fetch the incorrect pieces data
export const fetchActionIncorrectPiecessData = async () => {
  const response = await fetch('/api/constant-data/series/activities/ActionIncorrectPiecesConstants', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  })

  if (!response.ok) {
      throw new Error('Network response was not ok for incorrect data.')
  }

  const data = await response.json()
  return data.map((item: any) => ({ ...item, answer: 0 }))
}
