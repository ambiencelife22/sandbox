/* app error.tsx */
'use client'

import { useEffect } from 'react'

import FunctionLost404 from '@/pages/lost404'

export default function GrowersGeneralError({
    error,
    reset,
}: {
    error: Error
    reset: () => void
}) {
    useEffect(() => {
    }, [error])

    return (
        <div>
            <FunctionLost404 />
        </div>
    )
}