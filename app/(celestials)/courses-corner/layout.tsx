/* layout.tsx */
import React from 'react'

import AuthLayout from '@/utils/(auth-layouts)/AuthLayout'

import NavBar from '@/app/(a-growers)/components/NavBarGrowers'
import Footer from '@/app/(a-growers)/components/FooterGrowers'
import ModalContainer from '@/app/components/ModalContainer'

import { CourseProvider } from '@/utils/(contexts)/CoursesContext'

function layout({
    children
}: {
     children: React.ReactNode
}) {


    const modalDisclaimer = [
        {
            modalTitle: 'Courses Disclaimer',
            modalDescription: 'Our courses are intended for educational and informational purposes only.',
            modalDescription2: 'The content provided in our courses is not a substitute for professional advice, diagnosis, or treatment.',
            buttonLabel: 'Close',

        },
    ]

    return (
        <AuthLayout>
            <CourseProvider>
                <div className='pjs'>
                    <NavBar />
                    {children}
                    <div className='global_disclaimer mb-20 pb-8'>
                        <div className='text-sm disclaimer max-w-[500px] m-auto text-center'>
                            <ModalContainer visible={false} content={modalDisclaimer} buttonTitle={'Courses Disclaimer'} />
                        </div>
                    </div>
                    <Footer />
                </div>
            </CourseProvider>
        </AuthLayout>
    )
}

export default layout