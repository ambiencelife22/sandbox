/* TopicQuestion.tsx */
import React, { useState, useEffect } from 'react'

// @@ Import utility hooks @@
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@/app/components/ErrorAlert'
import { motion } from 'framer-motion'

import { Topic } from '@/utils/(structure)/InterfacesCourses'


interface TopicQuestionProps {
  currentTopic: Topic
  section: string
  handleTopicQuestionButtonClick: () => void
}


// Constants for input lengths
const ENTRY_MIN_LENGTH = 22
const ENTRY_MAX_LENGTH = 220


export const TopicQuestion: React.FC<TopicQuestionProps> = ({ currentTopic, section, handleTopicQuestionButtonClick }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [textAreaValue, setTextAreaValue] = useState<string>('')
  const [incompleteEntryError, setIncompleteEntryError] = useState(false)
  const sectionRender = section

  const handleClick = () => {
    if (textAreaValue.length < ENTRY_MIN_LENGTH) {
      alert(`Your entry must be at least ${ENTRY_MIN_LENGTH} characters!`)
      return
    }
  
    if (textAreaValue.length > ENTRY_MAX_LENGTH) {
      alert(`Your entry cannot exceed ${ENTRY_MIN_LENGTH} characters!`)
      return
    }
  
    handleTopicQuestionButtonClick()
  }


  return (
    <div className='course_section m-auto flex flex-col items-center'>
      <div className='course_question_content min-h-[330px] min-w-[75%]'>     
        <form
          className='bg-[#6A0074] shadow-xl rounded-xl px-8 pt-6 pb-[22px] mb-4 relative'
          style={{ minHeight: '407px' }}
        >
          <div className='mb-4'>
            <div className='absolute bottom-66 left-4 right-4'>
              <label className='block p_color text-lg pjs font-bold pb-4' htmlFor='currentTopic.question'>
                <p className='p_color'>{currentTopic.topicQuestion}</p>
              </label>
              <textarea
                id={currentTopic.topicQuestion}
                name={currentTopic.topicQuestion}
                required
                minLength={ENTRY_MIN_LENGTH}
                maxLength={ENTRY_MAX_LENGTH}
                value={textAreaValue}
                onChange={(e) => setTextAreaValue(e.target.value)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-[#1A1D1A] leading-tight focus:outline-none focus:shadow-outline'
                placeholder={
                  currentTopic.topicQuestionPrompt
                  + '\n\nEntry must be between '
                  + ENTRY_MIN_LENGTH + ' & '
                  + ENTRY_MAX_LENGTH + ' characters\n\nNOTE: Entries are not yet being saved for your future personal review'}
                style={{ padding: '11px', minHeight: '220px' }}
              ></textarea>
              {incompleteEntryError && errorMessage && <div className='text-red-500'>{errorMessage}</div>}
            </div>
          </div>
        </form>
      </div>
      <button
              onClick={handleClick}
              disabled={textAreaValue.length < ENTRY_MIN_LENGTH || textAreaValue.length > ENTRY_MAX_LENGTH}
              className={`${
                (textAreaValue.length < ENTRY_MIN_LENGTH || textAreaValue.length > ENTRY_MAX_LENGTH) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
        <motion.div className='signBtn3 min-w-[220px]' whileHover={{ scale: 1.1 }}>
          Answer Question
        </motion.div>
      </button>
    </div>
  )
}