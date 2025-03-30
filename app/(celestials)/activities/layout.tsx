import React from 'react'
import AuthLayout from '@/utils/(auth-layouts)/AuthLayout'
function layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>{children}</>
    )
}

export default layout