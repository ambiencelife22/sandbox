// useLocalStorage.tsx
import { useState, useEffect } from 'react'

// Defining the hook with TypeScript generics
const useLocalStorage = <T = any>(key: string, initialValue: T): [T, (value: T | ((prevValue: T) => T), expireInMinutes?: number) => void, () => void] => {

    const isJsonString = (str: string) => {
        try {
            JSON.parse(str)
            return true
        } catch (e) {
            return false
        }
    }

    // Initialization enhancement: directly check localStorage to set the initial state
    const [storedValue, setStoredValue] = useState<T>(initialValue)

    useEffect(() => {
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === key && isJsonString(e.newValue || '')) {
                setStoredValue(JSON.parse(e.newValue!))
            }
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('storage', handleStorageChange)

            return () => {
                window.removeEventListener('storage', handleStorageChange)
            }
        }
    }, [key]) 


    useEffect(() => {
        if (typeof window === 'undefined') {
            // Return early if running on server-side
            return
        }
    
        try {
            const item = window.localStorage.getItem(key)
            if (item && isJsonString(item)) {
                setStoredValue(JSON.parse(item))
            }
        } catch (error) {
            console.log(error)
        }
    }, [key])
    

    const setValue = (value: T | ((prevValue: T) => T), expireInMinutes?: number) => {
        if (typeof window === 'undefined') {
            // Return early if running on server-side
            return
        }
    
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value
            setStoredValue(valueToStore)
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
    
            // Handle expiration
            if (expireInMinutes) {
                const expirationDate = new Date()
                expirationDate.setMinutes(expirationDate.getMinutes() + expireInMinutes)
                window.localStorage.setItem(`${key}_expiresAt`, expirationDate.toISOString())
            }
        } catch (error) {
            console.log(error)
        }
    }
    

    useEffect(() => {
        if (typeof window === 'undefined') {
            // Return early if running on server-side
            return
        }
    
        const expiredAt = window.localStorage.getItem(`${key}_expiresAt`)
        if (expiredAt && new Date(expiredAt) <= new Date()) {
            clearStorage()
        }
    }, [key])
    

    // Function to clear a specific key from localStorage
    const clearStorage = () => {
        if (typeof window === 'undefined') {
            // Return early if running on server-side
            return
        }
    
        try {
            window.localStorage.removeItem(key)
            window.localStorage.removeItem(`${key}_expiresAt`)
            setStoredValue(initialValue)
        } catch (error) {
            console.log(error)
        }
    }
    

    return [storedValue, setValue, clearStorage]
}

export default useLocalStorage