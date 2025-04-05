/* layout.tsx */
import React from 'react'

import AuthLayout from '@/utils/(auth-layouts)/AuthLayout'

import { CourseProvider } from '@/utils/(contexts)/CoursesContext'

function layout({
    children
}: {
     children: React.ReactNode
}) {

    return (
        <AuthLayout>
            <CourseProvider>
                <div className='pjs'>
                    {children}
                </div>
            </CourseProvider>
        </AuthLayout>
    )
}

export default layout