/* _WeekNumberCalc.ts */
export function getYearWeekNumber(d: Date): { year: number, week: string } {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
    
    const formattedWeek = weekNo.toString().padStart(2, '0')
    
    return { year: d.getUTCFullYear(), week: formattedWeek }
}