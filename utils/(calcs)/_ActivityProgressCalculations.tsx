/* _ActivityProgressCalculations.tsx */

const MAX_TOTAL_POINTS = 2244

export type ThemeProgressData = ThemeData & {
  totalPoints: number
  progressPercentage: number
}

type ThemePoints = {
  cards: number
  seeds: number
  scramble: number
  typer: number
}

export type ThemeData = {
  id: number
  xtheme: string
  points: ThemePoints
}

/**
 * Calculate the total points for each theme and its progress percentage against 2244
 * @param themesData - The array of themes and their respective points
 * @returns An array of themes with their total points and progress percentage
 */
export const calculateTotalThemeProgress = (): ThemeProgressData[] => {
  // Retrieve the data directly from localStorage within this function
  const TotalUserPointsThemes = JSON.parse(localStorage.getItem('activity:progress') || '{}')
  
  // Check if the `meta` key exists and it is an array
  if (!TotalUserPointsThemes.meta || !Array.isArray(TotalUserPointsThemes.meta)) {
    return []
  }

  return TotalUserPointsThemes.meta.map((theme: ThemeData) => { // <-- Explicitly type theme here
    const totalPoints: number = theme.points ? Object.values(theme.points).reduce((acc, curr) => acc + (curr as number), 0) : 0
    const progressPercentage = (totalPoints / MAX_TOTAL_POINTS) * 100
    
    return {
      ...theme,
      totalPoints,
      progressPercentage,
    }
  })
}

export const calculateTotalActivityThemeTokens = (themeName: string, themesProgress: ThemeProgressData[]): number => {
  // Find the index of the current theme
  const themeIndex = themesProgress.findIndex(item => item.xtheme.toLowerCase() === themeName.toLowerCase())

  // If the theme is not found in local storage (meaning it hasn't been played yet), 
  // only grant access if the previous theme (if exists) has been completed.
  if (themeIndex === -1) {
      // If the theme is the very first theme (Gratitude), it should always be accessible.
      if (themeName.toLowerCase() === 'gratitude') {
          return 1
      }

      // If the theme is not the first, check the progress of the last theme in themesProgress.
      // If the last theme has been completed, then grant access to the next theme.
      if (themesProgress.length && themesProgress[themesProgress.length - 1].progressPercentage >= 100) {
          return 1
      }

      return 0
  }

  // If the theme is found in local storage and it's the first theme, it's always accessible.
  if (themeIndex === 0) {
      return 1
  }

  // For any other subsequent themes, check if the previous theme has 100% progress.
  if (themesProgress[themeIndex - 1].progressPercentage >= 100) {
      return 1
  }

  return 0
}




export type ActivityTypeProgressData = {
  seeds: number
  typer: number
  cards: number
  scramble: number
}

const MAX_POINTS: ActivityTypeProgressData = {
  seeds: 121,
  typer: 220,
  cards: 220,
  scramble: 968,
}


/**
 * Calculate activity progress percentages based on points and max points
 * @param activityTypeProgressData - The activity progress data
 */
export const calcActivityTypeProgressPercentage = (activityTypeProgressData: ActivityTypeProgressData): ActivityTypeProgressData => {
  let calculatedActivityTypeProgress: ActivityTypeProgressData = {
    seeds: 0,
    typer: 0,
    cards: 0,
    scramble: 0,
  }

  for (let activity in activityTypeProgressData) {
    calculatedActivityTypeProgress[activity as keyof ActivityTypeProgressData] = (activityTypeProgressData[activity as keyof ActivityTypeProgressData] / MAX_POINTS[activity as keyof ActivityTypeProgressData]) * 100
  }

  return calculatedActivityTypeProgress
}

/**
 * Get the activity data for the given theme from localStorage
 * @param activityTheme - The activity theme
 */
export const getActivityData = (activityTheme: string): ActivityTypeProgressData => {
  const TotalUserPointsThemes = JSON.parse(localStorage.getItem('activity:progress') || '{}')
  
  const foundTheme = TotalUserPointsThemes.meta.find((item: any) => {
    return item.xtheme === activityTheme
  }) || {}
  
  
  return {
    seeds: parseInt(foundTheme.points?.seeds || '0'),
    typer: parseInt(foundTheme.points?.typer || '0'),
    cards: parseInt(foundTheme.points?.cards || '0'),
    scramble: parseInt(foundTheme.points?.scramble || '0'),
  }
}





export const calculateActivityTokens = (foundTheme: string): string[] => {
  
  const themeData = getActivityData(foundTheme)

  const seedsPoints = themeData.seeds || 0
  const typerPoints = themeData.typer || 0
  const cardsPoints = themeData.cards || 0
  const scramblePoints = themeData.scramble || 0
    
  let activityTokens: string[] = ['seeds']

  if (seedsPoints >= 121) {
    activityTokens.push('typer')
  }

  if (seedsPoints >= 121 && typerPoints >= 220) {
    activityTokens.push('cards')
  }

  if (seedsPoints >= 121 && typerPoints >= 220 && cardsPoints >= 220) {
    activityTokens.push('scramble')
  }

  return activityTokens
}
