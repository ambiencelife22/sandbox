/* CourseTopicComponent.jsx */
'use client'
import React, { useState, Fragment } from 'react'

// @@ Import aux hooks @@
import { motion } from 'framer-motion'

// @@ Import child components & hooks
import CourseSectionComplete from './CourseSectionComplete'
import { TopicQuestion } from './TopicQuestion'
import { TopicComplete } from './TopicComplete'
import { CourseNoTopic } from './CourseNoTopic'
import { CourseFormatParagraphs } from './CourseFormatParagraphs'


const CourseTopicComponent = ({ courseSectionData, courseName, urlParam, selectedTopic }) => {

  const pathParts = window.location.pathname.split('/')
  const nextPath = `/${pathParts[1]}/${pathParts[2]}/${pathParts[3]}`
  
  const { topics, section, sectionUrl } = courseSectionData
  const paragraphsPerPage = 1

  const [currentTopicIndex, setCurrentTopicIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [topicQuestion, setTopicQuestion] = useState(false)
  const [topicComplete, setTopicComplete] = useState(false)
  const [contentComplete, setContentComplete] = useState(false)

  const currentTopic = selectedTopic
  const startIndex = (currentPage - 1) * paragraphsPerPage
  const endIndex = startIndex + paragraphsPerPage
  const currentParagraphs = currentTopic?.paragraphs.slice(startIndex, endIndex) || []

  const handleNextClick = () => {
    
    const totalPages = Math.ceil(currentTopic.paragraphs.length / paragraphsPerPage)
  
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1)
      return
    }
  
    if (topicQuestion) {
      setTopicQuestion(false)
      setCurrentPage(1)
  
      if (currentTopicIndex === topics.length - 1) {
        setContentComplete(true)
        return
      }
  
      setCurrentTopicIndex((prevIndex) => prevIndex + 1)
      setTopicQuestion(true)
      return
    }
  
    if (!topicQuestion && currentPage === totalPages) {
      if (currentTopicIndex < topics.length - 1) {
        setTopicQuestion(true)
        return
      }
  
      if (currentTopicIndex === topics.length - 1) {
        setContentComplete(true)
        return
      }
    }
  
    if (!topicComplete) {
      setCurrentPage(1)
      setCurrentTopicIndex((prevIndex) => prevIndex + 1)
      setTopicComplete(false)
  
      if (currentTopicIndex < topics.length) {
        setTopicQuestion(true)
        return
      }
    }
  }


  const handleTopicCompleteButtonClick = () => {
    if (topicComplete) {    
      if (typeof window !== 'undefined') {        
        window.location.href = nextPath
  
        if (window.location.href !== nextPath) {
          console.error('Navigation to next link failed.')
        }
      } 
    }
  }
  
  const handleTopicQuestionButtonClick = () => {
    if (topicQuestion) {
      setTopicComplete(true)
      setTopicQuestion(false)
    }
  }


  return (
    <motion.div
      className='course_section min-h-[440px]'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {!currentTopic ? (
        <CourseNoTopic />
      ) : topicComplete ? (
        <TopicComplete
          currentTopic={currentTopic}
          section={section}
          handleTopicCompleteButtonClick={handleTopicCompleteButtonClick}
        />
      ) : topicQuestion ? (
        <TopicQuestion
          currentTopic={currentTopic}
          section={section}
          handleTopicQuestionButtonClick={handleTopicQuestionButtonClick}
          question={currentTopic.question}
          questionPrompt={currentTopic.questionPrompt} 
        />
      ) : contentComplete ? (
        <CourseSectionComplete courseSectionName={section} courseName={courseName} urlParam={urlParam} />
      ) : (
        <div className='course_content_wrapper inset-0 mx-auto w-88'>
          <div className='course_paragraph_wrapper p_color flex flex-col items-center justify-start min-h-[330px] mt-[44px]'>
            {currentParagraphs.map((paragraph, idx) => (
              <motion.div
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className='course_paragraph_inner w-full mb-4'
                >
                {paragraph.content && (
                    <div className={`w-full text-left p_color text-lg pjs flex items-center ${paragraph.parClass === 'parClass2' ? 'flex-row-reverse' : ''}`}>
                      {paragraph.type === 'par' && <p className={`mb-0 ${paragraph.parClass} w-full text-left`}>{CourseFormatParagraphs(paragraph.content)}</p>}
                      {paragraph.type === 'parWithImage' && (
                        <div className={`flex flex-col items-center ${paragraph.parClass === 'parClass1' ? 'space-x-4' : ''}`}>
                          <img
                            className='lg:max-w-[44%] lg:max-h-[44%]'
                            src={paragraph.url}
                            alt={`Image: ${paragraph.alt}`}
                          />
                          <p className='mb-0 pt-[22px]'>{paragraph.content}</p>
                        </div>
                      )}
                      {paragraph.type === 'parWithVideo' && (
                        <div className={`flex items-center ${paragraph.parClass === 'parClass1' ? 'space-x-4' : ''}`}>
                          <p className='mb-0 pr-[22px]'>{paragraph.content.pContent}</p>
                          <video
                            className='max-w-[44%] max-h-[44%]'
                              src={paragraph.content.url}
                              controls
                            >
                            Your browser does not support the video tag.
                            <p>Video: {paragraph.content.alt}</p>
                          </video>
                        </div>
                      )}
                    </div>
                  
                )}
                </motion.div>
            ))}
          </div>
          <motion.div
            className='pagination'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className='course_buttons z-[9999] justify-center flex flex-row space-x-2'>
              <button
                onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                disabled={currentPage === 1}
                className={currentPage === 1 ? 'disabled opacity-50 !cursor-not-allowed' : ''}
              >
                <motion.div className='signBtn3 min-w-[121px]' whileHover={{ scale: 1.1 }}>
                  Previous
                </motion.div>
              </button>
              <button onClick={handleNextClick} disabled={topicComplete}>
                <motion.div className='signBtn3 min-w-[121px]' whileHover={{ scale: 1.1 }}>
                  {topicComplete ? 'Proceed to Next Step' : 'Next'}
                </motion.div>
              </button>
            </div>
            
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

export default CourseTopicComponent
