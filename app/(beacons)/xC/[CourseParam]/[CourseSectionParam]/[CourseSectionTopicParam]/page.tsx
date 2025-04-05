/* [CourseSectionParam]/page.tsx */
'use client'
import React, { useEffect, useState } from 'react'

import Link from 'next/link'

// @@ Import feature context
import { useCourseContext } from '@/utils/(contexts)/CoursesContext'

// @@ Import external structure functions @@
import { CoursesLoadingAnimation } from '@/components/ui/loading-animation'

// @@ Import child components @@
import CourseTopicComponent from '../components/CourseTopicComponent'
import { CourseNoTopic } from '../components/CourseNoTopic'

// @@ Import Feature Data
import courseData from '@/app/(celestials)/courses-corner/components/HumanHarmony.json'

import { FullCourseData, CourseSectionData, Topic } from '@/utils/(structure)/InterfacesCourses'


export interface Paragraph {
    id: string
    type: 'par' | 'parWithImage' | 'parWithVideo'
    content: string | { url: string, alt?: string, pContent?: string } | { url: string, pContent?: string } | { url?: string, alt?: string, pContent?: string }
    parClass?: string | null
}

import '../../../../../(celestials)/courses-corner/components/Courses.css'



const camelCaseToTitleCase = (input: string) => {
  return input
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, (match) => match.toUpperCase())
}

function CourseSectionPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [showFirstPart, setShowFirstPart] = useState(true)
  const [showSecondPart, setShowSecondPart] = useState(false)
  const [showButton, setShowButton] = useState(true)
  const [courseDataFromApi, setCourseData] = useState<FullCourseData | null>(null)
  const [selectedSection, setSelectedSection] = useState<CourseSectionData | null>(null)
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const [courseName, setCourseName] = useState<string>('')
  const [courseShortDescrip, setCourseShortDescrip] = useState<string>('')
  const [urlParam, setUrlParam] = useState<string>('')
  const [urlCourse, setUrlCourse] = useState<string>('')
  const [sectionUrl, setSectionUrl] = useState<string>('')
  const [courseNotFound, setCourseNotFound] = useState(false)

  const pathParts = window.location.pathname.split('/')
  const courseUrl = `/${pathParts[pathParts.length - 3]}`
  const courseSectionUrl = `/${pathParts[pathParts.length - 2]}`
  const courseSectionTopicUrl = `/${pathParts[pathParts.length - 1]}`
  const selectedSectionData = ''
  const courseSectionPage = courseUrl + courseSectionUrl


  useEffect(() => {

    const pathParts = window.location.pathname.split('/')
    const courseSectionUrl = pathParts[pathParts.length - 2]
    const courseSectionTopicUrl = pathParts[pathParts.length - 1]
    const storedData = localStorage.getItem('csc')
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setShowFirstPart(parsedData[1] !== 'complete')
      setShowSecondPart(parsedData[1] === 'complete' && parsedData[2] !== 'complete')
      setShowButton(parsedData[2] !== 'complete')
    }

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

    const matchingTopic = matchingSection.topics.find(
      (topic) => `${topic.topicUrl}` === courseSectionTopicUrl
    )
  
    if (!matchingTopic) {
      setCourseNotFound(true)
      setIsLoading(false)
      return
    }

    setSelectedTopic(matchingTopic)
    
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
      <div className='flex flex-col items-center justify-center h-screen'>
        <CourseNoTopic />
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
    <div className='w-full mx-auto min-h-[77vh]'>
      {/* <NavBar /> */}
      <div className='container max-w-screen-xl m-auto p-3 pt-2 mt-[88px]'>
        <div className='min-h-[40vh] flex flex-col items-center justify-center space-y-8'>
          <div className='faq_main course_main m-auto max-w-[880px]'>
            <h1 className='course_section_header text-center'>{courseName}: {selectedSection?.section}</h1>
            <h2 className='course_topic_header text-center'>{selectedTopic?.topicName}</h2>
            <div className={`course_topic sm:min-w-[90%] md:min-w-[90%] lg:min-w-[660px] xl:min-w-[660px]`}>
              <CourseTopicComponent
                courseSectionData={selectedSection}
                courseName={courseName}
                urlParam={urlParam}
                selectedTopic={selectedTopic}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center mt-4 flex-wrap'>
      <Link href={`/xC/` + `${courseSectionPage}`}className='return_to_content_button p_color flex gap-x-2 mb-4 mr-4 hover:underline'>
          <span>
            <img
              id='courses_image'
              className='w-6 h-6'
              src='https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_home%2Fxclusives-courses.svg?alt=media&token=d7706ce9-df92-4420-9a7e-1aeeade1af43'
            />
          </span>
          <span>Return To Section Page</span>
        </Link>
        <Link href={`/courses-corner/` + `${urlParam}`} className='return_to_content_button p_color flex gap-x-2 hover:underline'>
          <span>
            <img
              id='courses_image'
              className='w-6 h-6'
              src='https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_home%2Fxclusives-courses.svg?alt=media&token=d7706ce9-df92-4420-9a7e-1aeeade1af43'
            />
          </span>
          <span>Return To Course Portal</span>
        </Link>
        
        {/* <div className='global_disclaimer mt-[44px] mb-20 pb-8'>
            <div className='text-sm disclaimer max-w-[500px] m-auto text-center'>
                <div className='bottom-[44px]'>
                    <ModalContainer visible={false} content={modalDisclaimer} buttonTitle={'Courses Disclaimer'} />
                </div>   
            </div>
        </div> */}
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default CourseSectionPage
