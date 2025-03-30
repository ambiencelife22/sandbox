/* WaveWhite.tsx */
import React, { FC } from 'react'

import HeroBaseSVGWhite from './help/ HeroBaseSVGWhite'

export const WaveWhite: FC = () => {
    return (
        <section className='bg-white z-0' style={{ borderTop: '1px solid white', position: 'relative', top: '-10%', height: '22px' }}>
            <div className='' style={{ position: 'initial', marginTop: '-6%' }}>
                <HeroBaseSVGWhite />
            </div>
        </section>
    )
}