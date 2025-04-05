/* CourseSectionTabs.jsx */
'use client'
import React, { useState, useEffect, useCallback, Fragment } from 'react'

import Link from 'next/link'

// @@ Import aux hooks @@
import { motion } from 'framer-motion'

import '@/app/(a-growers)/profile/components/help/Fun-F-Faqs.css'
// import '@/app/(a-growers)/profile/components/help/NewsNNotes.css'

const formatParagraphs = (text) => {
  if (text) {
    return text.split('\n').map((item, key) => <Fragment key={key}>{item}<br /></Fragment>)
  }
  return null
}

// Human Harmony Intro: \n\nPlease Note: Progress is currently only save upon completion of a section, not by individual topic or page.


const CourseSectionTabs = ({ courseContent, about, urlCourse, sectionUrl, shortDescrip, sectionLaunch }) => {

  const initialCourseTab = 'Initial Course Tab'
  const [activeSectionUrl, setActiveSectionUrl] = useState('')

  const pathParts = window.location.pathname.split('/')
  const courseUrl = `/${pathParts[2]}`
  const courseSectionUrl = `/${pathParts[pathParts.length - 1]}`

  const courseTopicNames = courseContent.sections.flatMap(section => section.topics.map(topic => topic.topicName))
  const initialTopicTab = courseTopicNames[0]

  const [activeTab, setActiveTab] = useState('initialCourseTabContent')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const courseSectionNames = [...new Set(courseContent.sections.map((section) => section.section))]

  const activeSection = courseContent.sections.find((section) => section.sectionUrl === sectionUrl)
  const activeSectionTopics = activeSection ? activeSection.topics : []


  return (
    <div className='w-full mx-auto top-0'>
      <div className='page_header pb-4'>
        <h1 className='text-3xl font-bold text-center text-[#F1F1F1] mt-4'>
          {courseContent.name}
        </h1>
        <h2 className='text-base text-center text-[#F1F1F1] max-w-[330px] m-auto md:max-w-[88%]'>
          {activeSection.section}
        </h2>
      </div>
      
      <div className='faq_section'>
        {activeSectionTopics.map((topic) => (
          <a
          key={topic.id}
          href={`/xC/${courseContent.urlParam}/${activeSection.sectionUrl}/${topic.topicUrl}`}
        >
            <button key={topic.id} className='faq_item faq_question shadow-xl pl-4 w-[88%] m-auto hover:shadow-2xl'>
              <div className={`faq_question shadow-xl`}>
                {topic.topicName}
              </div>
            </button>
          </a>
        ))}  
      </div>
      <div className='flex justify-center mt-8 pt-8'>
          <Link href={`/courses-corner/` + `${courseUrl}`} className='return_to_content_button p_color flex gap-x-2 hover:underline'>
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

export default CourseSectionTabs