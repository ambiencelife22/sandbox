/* _TyperValidateAnswer.jsx */

// @@ Utility Function
function removePunctuation(str) {
    const s = String(str)  // Explicitly converting to string
    return s.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'']/g,'').replace(/\s{2,}/g,' ')
}


function editDistance(s1, s2) {
    const dp = Array(s1.length + 1).fill(null).map(() => Array(s2.length + 1).fill(0))

    for (let i = 0; i <= s1.length; i++) {
        for (let j = 0; j <= s2.length; j++) {
            if (i === 0) {
                dp[i][j] = j
            }
            if (j === 0) {
                dp[i][j] = i
            }
            if (i !== 0 && j !== 0 && s1.charAt(i - 1) === s2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1]
            }
            if (i !== 0 && j !== 0 && s1.charAt(i - 1) !== s2.charAt(j - 1)) {
                dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1])
            }
        }
    }

    return dp[s1.length][s2.length]
}



export const validateTyperAnswer = (
    userTypedPhrase,
    actionPhrase,
    handleCorrectAction,
    handleIncorrectAction,
    nextPhrase
) => {

    // Sanitize the user's input and the target phrase
    const sanitizedUserTypedPhrase = removePunctuation(userTypedPhrase)
    const sanitizedActionPhrase = removePunctuation(actionPhrase)

    const distance = editDistance(sanitizedUserTypedPhrase.trim().toLowerCase(), sanitizedActionPhrase.trim().toLowerCase())

    // Allowing for up to 2 errors
    if (distance <= 2) {
        handleCorrectAction()
        setTimeout(() => {
            nextPhrase()
        }, 2200)
        return  // Return after handling the correct answer
    }

    // For more than 2 errors
    if (distance > 2) {
        handleIncorrectAction()
        setTimeout(() => {
            nextPhrase()
        }, 2200)
    }
}
