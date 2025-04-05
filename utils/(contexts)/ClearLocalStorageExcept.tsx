/* ClearLocalStorageExcept.tsx */

export function clearLocalStorageExcept(exceptions: string[] = []) {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i)
      if (key && !exceptions.includes(key)) {
        localStorage.removeItem(key)
      }
    }
  }
  