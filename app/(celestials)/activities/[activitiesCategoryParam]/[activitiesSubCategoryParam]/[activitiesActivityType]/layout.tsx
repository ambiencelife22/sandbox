import React from 'react'
import AuthLayout from '../../../../../../utils/(auth-layouts)/AuthLayout'
function layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AuthLayout>{children}</AuthLayout>
    )
}

export default layout