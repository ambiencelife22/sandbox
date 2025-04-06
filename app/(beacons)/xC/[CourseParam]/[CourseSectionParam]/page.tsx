/* [CourseSectionParam]/page.tsx */
'use client'
import React, { useEffect, useState } from 'react'

import Link from 'next/link'

// @@ Import external structure functions @@
// import NavBarGrowers from '@/app/(a-growers)/components/NavBarGrowers'
// import Footer from '@/app/(a-growers)/components/FooterGrowers'

// @@ Import child components @@
import CourseSectionTabs from './components/CourseSectionTabs'

// @@ Import external structure hooks @@
import { CoursesLoadingAnimation } from '../../../../../components/ui/loading-animation'

// @@ Import Feature Data
import courseData from '../../../../(celestials)/courses-corner/components/HumanHarmony.json'
import { FullCourseData, CourseSectionData, Topic } from '../../../../../utils/(structure)/InterfacesCourses'

import '@/app/(celestials)/courses-corner/components/Courses.css'

const modalDisclaimer = [
  {
      modalTitle: 'Courses Disclaimer',
      modalDescription: 'Coming soonnn...',
      modalDescription2: 'Here, toooo...',
      modalDescription3: (<span className='modal_legal_link hover:underline'><a target='_blank'>Read more in our LEGAL section... (soonnnn...)</a></span>),
      buttonLabel: 'Close',

  },
]

const CourseSectionParam: React.FC = () => {

  const [isLoading, setIsLoading] = useState(true)

  const [courseDataFromApi, setCourseData] = useState<FullCourseData | null>(null)
  const [courseName, setCourseName] = useState<string>('')
  const [selectedSection, setSelectedSection] = useState<CourseSectionData | null>(null)

  const [urlParam, setUrlParam] = useState<string>('')
  const [urlCourse, setUrlCourse] = useState<string>('')
  const [sectionUrl, setSectionUrl] = useState<string>('')
  const [courseShortDescrip, setCourseShortDescrip] = useState<string>('')

  const pathParts = window.location.pathname.split('/')
  const courseUrl = `/${pathParts[2]}`
  const courseSectionUrl = `/${pathParts[pathParts.length - 1]}`
  const selectedSectionData = ''

  const [courseNotFound, setCourseNotFound] = useState(false)

  useEffect(() => {

    const pathParts = window.location.pathname.split('/')
    const courseSectionUrl = pathParts[pathParts.length - 1]

    const typedCourseData = courseData.Course as FullCourseData
    setCourseData(typedCourseData)

    if (typedCourseData.urlParam !== courseUrl) {
      setCourseNotFound(true)
      setIsLoading(false)
      return
    }

    const matchingSection = typedCourseData.sections.find(
      (section) => section.sectionUrl === courseSectionUrl
    )

    if (!matchingSection) {
      setCourseNotFound(true)
      setIsLoading(false)
      return
    }

    setCourseName(typedCourseData.name)
    setUrlParam(typedCourseData.urlParam)
    setUrlCourse(typedCourseData.urlCourse)
    setCourseShortDescrip(typedCourseData.shortDescrip)

    const sectionStructure = typedCourseData.sections[0]
    setSelectedSection(matchingSection)
    setSectionUrl(matchingSection.sectionUrl)

    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 1100)

    return () => clearTimeout(timeout)
  }, [])



  if (courseNotFound) {
    return (
      <div className='flex flex-col justify-center items-center min-h-screen'>
        <div>
          <h2 className='p_color text-2xl font-bold text-center w-full'>Course Not Found</h2>
        </div>
        <div className='flex justify-center mt-8'>
          <Link href={`/courses-corner/` + `${courseUrl}`} className='return_to_content_button p_color flex gap-x-2'>
            <span>
              <img
                id='courses_image'
                className='w-6 h-6'
                src='https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_home%2Fxclusives-courses.svg?alt=media&token=d7706ce9-df92-4420-9a7e-1aeeade1af43'
              />
            </span>
            <span>Return To Course Portal</span>
          </Link>
        </div>
      </div>
    )
  }


  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <CoursesLoadingAnimation />
      </div>
    )
  }


  return (
    <div>
      {/* <NavBarGrowers /> */}
      <div className='mt-[121px]'>
        <CourseSectionTabs
          courseContent={courseDataFromApi}
          about={selectedSection?.about}
          urlCourse={urlCourse}
          sectionUrl={sectionUrl}
          shortDescrip={courseShortDescrip}
          sectionLaunch={selectedSection?.sectionLaunch}
        />
        
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default CourseSectionParam
