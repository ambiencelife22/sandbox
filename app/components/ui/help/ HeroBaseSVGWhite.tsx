/* HeroBaseSVGWhite.tsx */
import React from 'react'

export const HeroBaseSVGWhite: React.FC = () => {
    return (
        <svg 
            version='1.1' 
            id='Layer_1' 
            xmlns='http://www.w3.org/2000/svg' 
            x='0px' 
            y='0px'
            viewBox='0 0 1879.8 121.3' 
            enableBackground='new 0 0 1879.8 121.3' 
        >
            <defs>
                <linearGradient id='gradient1' x1='0%' y1='0%' x2='100%' y2='0%'>
                    <stop offset='0%' style={{ stopColor: '#b221d2' }} />
                    <stop offset='50%' style={{ stopColor: '#651279' }} />
                    <stop offset='100%' style={{ stopColor: '#54005C' }} />
                </linearGradient>
            </defs>
            <path 
                fill='url(#gradient1)' 
                d='M0,64.3c0,0,301-69.6,501-64s385.3,35.4,494.3,53.5s506,102.5,884.4,0v53.5H0V64.3z'
            />
            <path 
                fill='white' 
                d='M0,63.3c0,0,301-38.6,501-33s299.4,21.5,438.8,37.4c118.4,13.5,580.3,78,939.9,5.1v48.5H0V63.3z'
            />
        </svg>
    )
}

export default HeroBaseSVGWhite