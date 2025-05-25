/* _ShuffleSeedsArray.tsx */
// @@@@ NOT YET USED @@@@
export function shuffleSeedsArray<T>(array: T[]): T[] {
    let shuffleSeedsArray = [...array]; // Copy to avoid mutating the original array
    for (let i = shuffleSeedsArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffleSeedsArray[i], shuffleSeedsArray[j]] = [shuffleSeedsArray[j], shuffleSeedsArray[i]]
    }
    return shuffleSeedsArray
}
