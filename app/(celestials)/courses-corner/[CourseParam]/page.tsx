/* CoursePage.tsx */
'use client'
import React, { useState, useEffect } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

// @@ Import feature provider
import { CourseProvider } from '../../../../utils/(contexts)/CoursesContext'

// @@ Import external structure functions @@
import { CoursesLoadingAnimation } from '../../../../components/ui/loading-animation'

// @@ Import child components @@
import HumanHarmonyCourseDisclaimer1 from '../components/HumanHarmonyCourseDisclaimer1'
import HumanHarmonyCourseDisclaimer2 from '../components/HumanHarmonyCourseDisclaimer2'
import CourseTabs from '../components/CourseTabs'

// @@ Import Type-Check Interfaces @@
import { FullCourseData } from '../../../../utils/(structure)/InterfacesCourses'

// @@ Import Feature Data
import courseData from '../components/HumanHarmony.json'

import '../components/Courses.css'


function CoursePage() {

  const [isLoading, setIsLoading] = useState(true)
  
  const [showFirstPart, setShowFirstPart] = useState(true)
  const [showSecondPart, setShowSecondPart] = useState(false)
  const [showTabs, setShowTabs] = useState(false)
  const [showButton, setShowButton] = useState(true)
  const [courseDataFromApi, setCourseData] = useState<FullCourseData | null>(null)

  const [urlCourse, setUrlCourse] = useState<string>('')
  const [sectionUrl, setSectionUrl]  = useState<string>('')
  const [shortDescrip, setShortDescrip]  = useState<string>('')
  const [sectionLaunch, setSectionLaunch]  = useState<string>('')

  const [courseNotFound, setCourseNotFound] = useState(false)

  const pathname = usePathname()
const pathParts = pathname.split('/')
const courseUrl = `/${pathParts[pathParts.length - 1]}`
  

  const handleNextClick = () => {
    if (showFirstPart) {
      localStorage.setItem('cd', JSON.stringify({ 1: 'complete', 2: '' }))
      setShowFirstPart(false)
      setShowSecondPart(true)
      return
    }

    if (showSecondPart) {
      localStorage.setItem('cd', JSON.stringify({ 1: 'complete', 2: 'complete' }))
      setShowSecondPart(false)
      setShowTabs(true)
      setShowButton(false)
    }
  }


  useEffect(() => {
    const storedData = localStorage.getItem('cd')
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      if (parsedData[1] === 'complete' && parsedData[2] === 'complete') {
        setShowFirstPart(false)
        setShowSecondPart(false)
        setShowTabs(true)
        setShowButton(false)
      }
      setShowFirstPart(parsedData[1] !== 'complete')
      setShowSecondPart(parsedData[1] === 'complete' && parsedData[2] !== 'complete')
      setShowTabs(parsedData[2] === 'complete')
      setShowButton(parsedData[2] !== 'complete')
    }
  
    const typedCourseData = courseData.Course as FullCourseData

    const matchingCourse = typedCourseData.urlParam === courseUrl

    if (!matchingCourse) {
      setCourseNotFound(true)
      setIsLoading(false)
      return
    }
  
    const updatedTopics = typedCourseData.sections.map((section) => ({
      ...section,
      topics: section.topics.map((topic) => ({
        ...topic,
        paragraphs: topic.paragraphs.map((paragraphContent, index) => ({
          id: `p${section.id}-${topic.topicName}-${index + 1}`,
          type: 'par' as const,
          content: paragraphContent.type === 'parWithImage' || paragraphContent.type === 'parWithVideo'
            ? paragraphContent.content as { url?: string; alt?: string; pContent?: string }
            : paragraphContent.content as string,
          parClass: paragraphContent.parClass || null,
        })),
      })),
    }))

    const updatedCourseData: FullCourseData = {
      ...typedCourseData,
      sections: updatedTopics,
    }

    setCourseData((prevData) => {
      if (!prevData) {
        return updatedCourseData
      }
      return {
        ...prevData,
        sections: updatedTopics,
      }
    })

    setUrlCourse(updatedCourseData.urlCourse)
    setShortDescrip(updatedCourseData.shortDescrip)

    const sectionStructure = updatedCourseData.sections[0]
    setSectionUrl(sectionStructure.sectionUrl)

    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 2200)

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
    return <div className='flex justify-center items-center min-h-screen'>
                <CoursesLoadingAnimation />
            </div>
  }
  

  return (
    <div className='w-full mx-auto min-h-[77vh]'>
      <div className='container max-w-screen-xl m-auto p-3 pt-5 mt-[88px]'>
        <div className='min-h-[40vh] flex flex-col items-center justify-center space-y-8'>
          {showFirstPart && (
            <HumanHarmonyCourseDisclaimer1 />
          )}
          {showSecondPart && (
            <HumanHarmonyCourseDisclaimer2 />
          )}
          {showTabs && courseDataFromApi && (
            <CourseTabs
              courseContent={courseDataFromApi}
              about={courseDataFromApi.about}
              urlCourse={urlCourse}
              sectionUrl={sectionUrl}
              shortDescrip={shortDescrip}
              sectionLaunch={sectionLaunch}
            />
          )}
          {showButton && (
            <button className='next-button' onClick={handleNextClick}>
              <div className='signBtn3 min-w-[110px]'>
                Next
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const Courses = () => {
  return (
    <CourseProvider>
      <CoursePage />
    </CourseProvider>
  )
}

export default Courses