/* courses/page.tsx */
'use client'
import React, { useEffect, useState } from 'react'

// @@ Import external structure hooks @@
import { CoursesLoadingAnimation } from '@/components/ui/loading-animation'

// @@ Import layout functions @@
import Header from '@/app/(a-growers)/eh/header'
import BrickCoursesIntro from './components/_BrickCoursesIntro'
import BrickCourseHHIntro from './components/_BrickCourseHHIntro'
import BrickCoursesCorner from './components/_BrickCoursesCorner'

const CoursePage: React.FC = () => {

    const [loading, setLoading] = useState(true)
    const [User, SetUser] = React.useState({})


    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2200)

        let activeSession = JSON.parse(localStorage.getItem('session') || '{}')
        SetUser(activeSession)
    }, [])


    if (loading) {
        return <div className='flex justify-center items-center min-h-screen'><CoursesLoadingAnimation /></div>
    }


    return (
        <div className='al_home py-8 text-[Plus Jakarta Sans] mt-[22px]'>
            <div className='header_div pt-[44px]'>
                <Header pageTitle={'Courses Corner'} pageDescrip1={'A collection of in-house educational series'} pageDescrip2={''} />
            </div>
            <div className='activity_subcategory_container mb-[88px]'>
                <div className='activity_icon_grid max-w-[1100px] grid grid-cols-2 md:grid-cols-3 gap-6 py-4 px-2 rounded-xl mx-auto w-full'>
                    <BrickCoursesIntro animateDuration={0.4} />
                    <BrickCourseHHIntro animateDuration={0.4} />
                    <BrickCoursesCorner animateDuration={0.4} />
                </div>
            </div>
        </div>
    )
}

export default CoursePage

