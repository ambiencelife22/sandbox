/* TopicButtons.tsx */

import React from 'react'

import { motion } from 'framer-motion'

interface TopicButtonsProps {
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    handleTopicCompleteButtonClick: () => void
    handleTopicQuestionButtonClick: () => void
    handleNextClick: () => void
    currentPage: number
    topicComplete: boolean
  }
  
  const TopicButtons: React.FC<TopicButtonsProps> = ({
    setCurrentPage,
    handleTopicCompleteButtonClick,
    handleTopicQuestionButtonClick,
    handleNextClick,
    currentPage,
    topicComplete,
  }) => {
    const setTopicCompleteAndQuestion = (resetTopicQuestion: boolean) => {
      handleTopicCompleteButtonClick()
      if (resetTopicQuestion) {
        handleTopicQuestionButtonClick()
      }
    }
  
    return (
      <div className='pagination justify-center flex flex-row space-x-4'>
        <button
          onClick={() => setCurrentPage((prevPage: number) => Math.max(prevPage - 1, 1))}
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
    )
  }
  
  export default TopicButtons