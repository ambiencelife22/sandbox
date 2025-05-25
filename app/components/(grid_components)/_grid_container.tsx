// _grid_container.tsx
'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
function GridContainer({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='al_icon_grid grid grid-cols-2 md:grid-cols-3 gap-6 py-4 px-4 rounded-xl'>
            {children}
        </div>
    )
}

export default GridContainer






