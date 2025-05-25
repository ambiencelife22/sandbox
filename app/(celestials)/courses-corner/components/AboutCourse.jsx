/* AboutCourse.jsx */
'use client'
import React, { useState, useEffect, Fragment } from 'react'

// @@ Import aux hooks @@
import { motion } from 'framer-motion'

// @@ Import external structure functions @@
import { DotsLoadingAnimation } from '../../../../components/ui/loading-animation'


const formatParagraphs = (text) => {
  if (text) {
    return text.split('\n').map((item, key) => <Fragment key={key}>{item}<br /></Fragment>)
  }
  return null
}


const AboutCourse = ({ courseSectionName, about, courseName, urlCourse, sectionUrl, sectionLaunch, activeSectionUrl }) => {
  const [isLoading, setIsLoading] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [contentComplete, setContentComplete] = useState(false)

  const { about1Subheadline, about1, about2Subheadline, about2, about3Subheadline, about3 } = about

  const handleNextClick = () => {
    setCurrentPage((prevPage) => {
      if (prevPage < 3) {
        if (prevPage === 3) {
          setContentComplete(true)
        }
        return prevPage + 1
      }
      setContentComplete(true)
      return prevPage
    })
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [courseSectionName])
  

  useEffect(() => {
    setContentComplete(false)
    if (contentComplete) {
      if (urlCourse && sectionUrl) {
        window.location.href = '/' + urlCourse + '/' + activeSectionUrl
      }
      if (!sectionUrl) {
        window.location.reload()
      }
    }
  }, [contentComplete, urlCourse, sectionUrl])
  
  

  if (isLoading) {
    return <div className='flex justify-center items-center min-h-screen'>
                <DotsLoadingAnimation />
            </div>
  }


  return (
    <motion.div
      className='course_section_about min-h-[440px]'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className='course_section_about_container'>
        <h2 className='section_header text-[#F1F1F1]'>
          {courseSectionName === 'About'
            ? courseSectionName + ' ' + courseName
            : courseSectionName === 'Introduction'
              ? courseSectionName
              : 'About ' + courseSectionName
          }
        </h2>
        <div className='course_section_about_content min-h-[330px]'>
          <div className='about_course_section p_color'>
            {currentPage === 1 && <p className='text-lg italic text-center pb-[2em]'>{formatParagraphs(about1Subheadline)}</p>}
            {currentPage === 1 && <p className='text-lg'>{formatParagraphs(about1)}</p>}
            {currentPage === 2 && <p className='text-lg italic text-center pb-[2em]'>{formatParagraphs(about2Subheadline)}</p>}
            {currentPage === 2 && <p className='text-lg'>{formatParagraphs(about2)}</p>}
            {currentPage === 3 && <p className='text-lg italic text-center pb-[2em]'>{formatParagraphs(about3Subheadline)}</p>}
            {currentPage === 3 && <p className='text-lg'>{formatParagraphs(about3)}</p>}
          </div>
        </div>
      </div>
      <motion.div
        className='pagination justify-center flex flex-row space-x-4 bottom-0 mt-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1 }}
      >
        <button onClick={handleNextClick}>
          <motion.div className={`signBtn3 ${currentPage === 3 && courseSectionName !== 'About' ? 'min-w-[143px]' : 'min-w-[143px]'} ${currentPage === 3 && courseSectionName === 'Introduction' ? 'min-w-[242px]' : ''}`} whileHover={{ scale: 1.1 }}>
            {currentPage === 3 && courseSectionName === 'About' ? 'Finish' :
              currentPage === 3 && courseSectionName === 'Introduction' ? 'Continue Introduction' :
              currentPage === 3 && courseSectionName !== 'About' ? 'Go To Section' :
              'Next'}
          </motion.div>
        </button>
      </motion.div>
    </motion.div>
  )
}

export default AboutCourse