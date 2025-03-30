/* useDataFetchClient.ts */
// @@@@ NOT YET USED @@@@
import { useState, useEffect } from 'react'

function useDataFetchClient(fetchFuncs: (() => Promise<any>)[]) {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all(fetchFuncs)
      .then(responseData => {
        setData(responseData)
        setIsLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch data:', err)
        setError("Sorry, there was a problem fetching the data. Please try again later.")
        setIsLoading(false)
      })
  }, [fetchFuncs])

  return { isLoading, data, error }
}

export default useDataFetchClient
