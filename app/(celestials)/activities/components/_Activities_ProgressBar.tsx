/* _Activities_ProgressBar.tsx */
'use client'
import React from 'react'

interface ACTIVITIESProgressBarProps {
    progressPercentage?: number,
    activityName?: string,
    className?: string,
    style?: React.CSSProperties
}

const ACTIVITIESProgressBar: React.FC<ACTIVITIESProgressBarProps> = ({ className, progressPercentage, activityName, style }) => {

    return (
        <div className={`activity_progress_container ${className}`} style={style}> 
            <div className='activity_progress_shell'>
                <div className='progress_indicator' style={{ 'width': `${progressPercentage}%`, 'height': '100%', 'background': 'linear-gradient(61deg, #7FDEFF, #DABFFF)' }}></div>
            </div>
        </div>
    )
    
}

export default ACTIVITIESProgressBar
