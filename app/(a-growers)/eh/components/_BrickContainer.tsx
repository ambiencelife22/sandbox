// _brick_container.tsx
import React from 'react'

interface BrickContainerProps {
    children: React.ReactNode
}

const BrickContainer: React.FC<BrickContainerProps> = ({children}) => {
    return (
        <div className='al_icon_grid grid grid-cols-2 md:grid-cols-3 gap-6 py-4 px-4 rounded-xl'>
                {children}
        </div>
    )
}

export default BrickContainer