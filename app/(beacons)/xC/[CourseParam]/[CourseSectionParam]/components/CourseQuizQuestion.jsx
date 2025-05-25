/* CourseQuizQuestion.jsx */
import React, { useState } from 'react'

// @@ Import aux hooks @@
import { motion } from 'framer-motion'

// Constants for input lengths
const ENTRY_MIN_LENGTH = 22
const ENTRY_MAX_LENGTH = 220


export const CourseQuizQuestion = ({ question, options, onSelect, isCorrect, type, correctAnswer }) => {
  const validationClass = isCorrect ? 'correct' : 'incorrect'
  const [userAnswer, setUserAnswer] = useState('')
  const [textAreaValue, setTextAreaValue] = useState('')
  const [incompleteEntryError, setIncompleteEntryError] = useState(false)
  const [isAnswered, setIsAnswered] = useState(false)

  const handleSubmit = () => {
    
    if (type === 'oe' && textAreaValue.length > ENTRY_MIN_LENGTH && textAreaValue.length < ENTRY_MAX_LENGTH) {
      setIsAnswered(true)
      onSelect({ question, userAnswer: textAreaValue }, true)
      setTextAreaValue('')
      return
    }
  
    if (textAreaValue.length < ENTRY_MIN_LENGTH) {
      alert(`Your entry must be at least ${ENTRY_MIN_LENGTH} characters!`)
      return
    }
  
    if (textAreaValue.length > ENTRY_MAX_LENGTH) {
      alert(`Your entry cannot exceed ${ENTRY_MIN_LENGTH} characters!`)
      return
    }
  
    setIsAnswered(true)
  }
  


  return (
    <motion.div
      className='px-[11px] pb-[22px]'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.1 }}
    >
      {type === 'oe' && isCorrect === null && (
        <div className='max-w-[660px] p_color space-y-4 m-auto'>
          <form
            className='bg-[#6A0074] shadow-xl rounded-xl px-8 pt-6 pb-[22px] mb-4 relative'
            style={{ minHeight: '407px' }}
          >
            <div className='mb-4'>
              <div className='absolute bottom-66 left-4 right-4'>
                <label className='block p_color text-lg pjs font-bold pb-4' htmlFor='question'>
                <h3 className='p_color text-lg font-bold text-left'>{question}</h3>
                </label>
                <textarea
                  id={question}
                  name={question}
                  required
                  minLength={ENTRY_MIN_LENGTH}
                  maxLength={ENTRY_MAX_LENGTH}
                  value={textAreaValue}
                  onChange={(e) => setTextAreaValue(e.target.value)}
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-[#1A1D1A] leading-tight focus:outline-none focus:shadow-outline'
                  placeholder={
                    'Entry must be between '
                    + ENTRY_MIN_LENGTH + ' & '
                    + ENTRY_MAX_LENGTH + ' characters\n\nNOTE: Entries are not yet being saved for your future personal review'}
                  style={{ padding: '11px', minHeight: '220px' }}
                ></textarea>
                {incompleteEntryError && errorMessage && <div className='text-red-500'>{errorMessage}</div>}
              </div>
            </div>
          </form>
          <div className='flex justify-center pt-[143px] sm:pt-2'>
            <button
              onClick={handleSubmit}
              disabled={textAreaValue.length < ENTRY_MIN_LENGTH || textAreaValue.length > ENTRY_MAX_LENGTH}
              className={`${
                (textAreaValue.length < ENTRY_MIN_LENGTH || textAreaValue.length > ENTRY_MAX_LENGTH) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <motion.div className='signBtn3 min-w-[220px]' whileHover={{ scale: 1.1 }}>
                Submit Response
              </motion.div>
            </button>
          </div>
        </div>
      )}

      {isCorrect === null && type !== 'oe' && (
        <div className='flex justify-center items-center'>
          <div className='course_quiz_question max-w-[770px] p_color space-y-4 pt-[44px]'>
            <h3 className='p_color text-lg font-bold text-left'>{question}</h3>
            {options.map((option) => (
              <motion.p
                key={option}
                className='mx-auto pjs text-[Plus Jakarta Sans] text-left'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.1 }}
                onClick={() => onSelect(option)}
                style={{ cursor: 'pointer' }}
              >
                {option}
              </motion.p>
            ))}
          </div>
        </div>   
      )}

      {isCorrect !== null && (
        <div className={validationClass}>
          {isCorrect ? (
            <div className='courses_complete p_color'>
                <h2 className='text-2xl text-center font-bold p_color'>
                  Woohoo! Good Answer!
                </h2>
            </div>
          ) : (
            <div className='courses_complete p_color'>
                <h2 className='text-2xl text-center font-bold text-[#FF0000]'>
                  Oops!
                </h2>
                <p>
                  The correct answer is {correctAnswer}
                </p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}