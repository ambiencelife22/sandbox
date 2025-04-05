/* CourseTabs.jsx */
'use client'
import React, { useState, useEffect, useCallback, Fragment } from 'react'

// @@ Import aux hooks @@
import { motion } from 'framer-motion'

// @@ Import Child Functions
import AboutCourse from './AboutCourse'
import CourseSidebar from './CourseSidebar'
import ProfileCloseButton from './ProfileCloseButton'

const formatParagraphs = (text) => {
  if (text) {
    return text.split('\n').map((item, key) => <Fragment key={key}>{item}<br /></Fragment>)
  }
  return null
}

// Human Harmony Intro: \n\nPlease Note: Progress is currently only save upon completion of a section, not by individual topic or page.


const CourseTabs = ({ courseContent, about, urlCourse, sectionUrl, shortDescrip, sectionLaunch }) => {

  const initialCourseTab = 'Initial Course Tab'
  const [activeSectionUrl, setActiveSectionUrl] = useState('')

  const InitialCourseTabContent = () => {
    return (
      <motion.div
        className='course_section p_color'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className='text-3xl font-bold text-left mt-2 mb-4'>
          Welcome to {courseContent.name}
        </h2>
        <div className='about_course_section p_color space-y-4'>
          {courseContent.medDescrip1 && <p>{formatParagraphs(courseContent.medDescrip1)}</p>}
          {courseContent.medDescrip2 && <p>{formatParagraphs(courseContent.medDescrip2)}</p>}
          {courseContent.medDescrip3 && <p>{formatParagraphs(courseContent.medDescrip3)}</p>}
          {courseContent.medDescrip4 && <p>{formatParagraphs(courseContent.medDescrip4)}</p>}
        </div>
        <h3 className='text-lg text-[#7FDEFF] text-center mt-4 pt-4 mb-4'>
          ⬅ <span className='italic'>Use the menu to access the available course sections</span>
        </h3>
      </motion.div>
    )
  }


  const [activeTab, setActiveTab] = useState('initialCourseTabContent')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const courseSectionNames = [...new Set(courseContent.sections.map((section) => section.section))]

  const activeSection = courseContent.sections.find((section) => section.section === activeTab)
  const aboutData = activeSection ? activeSection.about : {}

  const handleAboutClick = () => {
    setActiveTab('About')
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  }

  const handleCourseStart = useCallback(() => {
  }, [])

  const handleTabClick = (tab) => {
    const selectedSection = courseContent.sections.find((section) => section.section === tab);
    const sectionUrl = selectedSection ? selectedSection.sectionUrl : '';

    setActiveTab(tab);
    setActiveSectionUrl(sectionUrl);

    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    }

    handleCourseStart();
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }


  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1100
  )

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.keyCode === 27) {
        setIsSidebarOpen(false)
      }
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth)
      window.addEventListener('keydown', handleEscape)
      window.addEventListener('resize', handleResize)
    }

    if (initialCourseTab && initialCourseTab !== activeTab) {
      setActiveTab(initialCourseTab)
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }

  }, [])


  return (
    <div className='w-full mx-auto top-0'>
      <h1 className='text-3xl font-bold text-center text-[#F1F1F1] mt-4'>
        {courseContent.name}
      </h1>
      <h2 className='text-base text-center text-[#F1F1F1] max-w-[330px] m-auto md:max-w-[88%]'>
        {courseContent.shortDescrip}
      </h2>
      <div className='faq_main m-auto'>
        <button onClick={toggleSidebar}>
          <svg
            className='menu_button'

            style={{
              height: '22px',
              width: '22px',
              color: '#f1f1f1',
            }}
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 17 14'
          >
            <path
              stroke='#F1F1F1'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 1h15M1 7h15M1 13h15'
            />
          </svg>
        </button>

        <div className='vertical_tabs'>
          <CourseSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} >
            <button onClick={toggleSidebar} className='profile_menu_mobile_close_button' tabIndex={0}>
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#81038f] shadow-md text-[22px] cursor-pointer">
                <ProfileCloseButton />

              </span>
            </button>
            <div className='side_menu_sidebar_tab_buttons'>
              {courseSectionNames.map((courseSectionName) => {
                const section = courseContent.sections.find((section) => section.section === courseSectionName)
                const isNotLaunched = section?.sectionLaunch === 'Not Launched'

                return (
                  <button
                    key={courseSectionName}
                    aria-label='Open FAQ sidebar'
                    className={`sidebar_tab_button ${activeTab === courseSectionName ? 'profile_tab_active' : ''} ${isNotLaunched ? 'opacity-50 cursor-not-allowed dashboard_brick brick not_launched' : ''}`}
                    onClick={() => {
                      if (!isNotLaunched) {
                        handleTabClick(courseSectionName, sectionUrl)
                        handleCourseStart()
                      }
                    }}
                    disabled={isNotLaunched}
                  >
                    {courseSectionName.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </button>
                )
              })}

            </div>
          </CourseSidebar>

          <div className='sidebar_tab_buttons'>
            {courseSectionNames.map((courseSectionName) => {
              const section = courseContent.sections.find((section) => section.section === courseSectionName)
              const isNotLaunched = section?.sectionLaunch === 'Not Launched'

              return (
                <button
                  key={courseSectionName}
                  className={`sidebar_tab_button ${activeTab === courseSectionName ? 'profile_tab_active' : ''} ${isNotLaunched ? 'opacity-50 cursor-not-allowed dashboard_brick brick not_launched' : ''}`}
                  onClick={() => {
                    if (!isNotLaunched) {
                      handleTabClick(courseSectionName, sectionUrl)
                      handleCourseStart()
                    }
                  }}
                  aria-label={`Switch to ${courseSectionName} courseContent`}
                  disabled={isNotLaunched}
                >
                  {courseSectionName}
                </button>
              )
            })}
          </div>

          <div className='course_content shadow-2xl'>
            {activeTab === initialCourseTab && <InitialCourseTabContent />}

            {activeTab !== initialCourseTab && (
              <AboutCourse
                windowWidth={windowWidth}
                courseContent={courseContent.sections}
                handleCourseStart={handleCourseStart}
                courseSectionName={activeTab}
                about={aboutData}
                urlCourse={urlCourse}
                sectionUrl={sectionUrl}
                sectionLaunch={sectionLaunch}
                activeSectionUrl={activeSectionUrl}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseTabs