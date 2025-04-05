/* CourseSectionComplete.jsx */
import React, { useState, useEffect } from 'react'

// @@ Import aux hooks @@
import { motion } from 'framer-motion'

// @@ Import child components
import CourseSectionQuiz from './CourseSectionQuiz'

const CourseSectionComplete = ({ courseSectionName, courseName, urlParam }) => {

  const [showQuiz, setShowQuiz] = useState(false)
  const [quizPayload, setQuizPayload] = useState(null)
  
  const handleTakeQuizClick = () => {
    setShowQuiz(true)
  }

  const handleQuizSubmit = (payload) => {
    setQuizPayload(payload)
  }


  return (
    <motion.div
      className='course_section'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.1 }}
    >
      {showQuiz ? (
        <CourseSectionQuiz
          courseSectionName={courseSectionName}
          courseName={courseName}
          urlParam={urlParam}
        />
      ) : (
        <div className='max-w-[660px] p_color space-y-4 m-auto pt-[44px]'>
          <div className='courses_complete p_color'>
            <h3 className='text-2xl text-center font-bold p_color mt-2 mb-4'>Woohoo! Course Section Complete</h3>
            <p className='text-center'>
              Congratulations! You have completed the this course section.
            </p>
          </div>
          <div className='flex justify-center'>
            <button onClick={handleTakeQuizClick}>
              <motion.div
                className='signBtn3 min-w-[110px]'
                whileHover={{ scale: 1.1 }}
              >
                Take Quiz
              </motion.div>
            </button>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default CourseSectionComplete