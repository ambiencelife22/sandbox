/* CourseSectionQuiz.jsx */
import React, { useState, useEffect } from 'react'

// @@ Import aux hooks @@
import { motion } from 'framer-motion'

import { CourseSectionFinalPage } from './CourseSectionFinalPage'
import { CourseQuizQuestion } from './CourseQuizQuestion'

const CourseSectionQuiz = ({ courseSectionName, courseName, urlParam, onSubmitQuiz }) => {

  const [currentPage, setCurrentPage] = useState(1)
  const [userAnswers, setUserAnswers] = useState([])
  const [questions, setQuestions] = useState([])
  const [isAnswered, setIsAnswered] = useState(false)
  const [quizFinalPage, setQuizFinalPage] = useState(false)

  const handleNextClick = () => {
    if (currentPage <= questions.length && isAnswered) {
      setCurrentPage((prevPage) => prevPage + 1)
      setIsAnswered(false)

      if (currentPage === questions.length) {
        setQuizFinalPage(true)
      }
    }
  }

  const handleAnswerSelect = (selectedAnswer) => {
    const currentQuestion = questions[currentPage - 1]
    const isCorrect = currentQuestion.type === 'oe' || selectedAnswer === currentQuestion.correctAnswer

    const answerObject = {
      selectedAnswer,
      isCorrect,
    }
  
    setUserAnswers((prevAnswers) => [...prevAnswers, answerObject])
  
    setIsAnswered(true)
  }
  
  

  useEffect(() => {
    import('./CourseQuiz.json')
      .then((data) => {
        const filteredQuestions = data.default.filter(
          (question) => question.courseSectionName === courseSectionName
        )
        setQuestions(filteredQuestions)
      })
      .catch((error) => {
        console.error('Error loading quiz questions:', error)
      })
  }, [courseSectionName])


  return (
    <motion.div
      className='course_quiz pt-[44px] m-auto'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {currentPage <= questions.length &&  !quizFinalPage && (
        <CourseQuizQuestion
          question={questions[currentPage - 1].question}
          options={questions[currentPage - 1].options}
          type={questions[currentPage - 1].type}
          correctAnswer={questions[currentPage - 1].correctAnswer}
          onSelect={handleAnswerSelect}
          isCorrect={isAnswered ? userAnswers[currentPage - 1].isCorrect : null}
        />
      )}
  
      {isAnswered && !quizFinalPage && (
        <motion.div
          className='pagination justify-center flex flex-row space-x-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1 }}
        >
          <button onClick={handleNextClick} disabled={!isAnswered}>
            <motion.div className='signBtn3 min-w-[110px]' whileHover={{ scale: 1.1 }}>
              {currentPage === questions.length + 1 ? 'Finish' : 'Next'}
            </motion.div>
          </button>
        </motion.div>
      )}
  
      {quizFinalPage && <CourseSectionFinalPage urlParam={urlParam} onSelect={(userAnswer, isCorrect) => handleQuestionSelect(userAnswer, isCorrect)} />}
    </motion.div>
  )
}

export default CourseSectionQuiz