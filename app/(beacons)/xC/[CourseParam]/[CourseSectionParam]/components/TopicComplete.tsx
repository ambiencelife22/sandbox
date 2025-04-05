/* TopicComplete.tsx */
import React, { FC } from 'react'

// @@ Import aux hooks @@
import { motion } from 'framer-motion'

import { Topic } from '@/utils/(structure)/InterfacesCourses'


interface TopicCompleteProps {
    currentTopic: Topic
    section: string
    handleTopicCompleteButtonClick: () => void
}


export const TopicComplete: FC<TopicCompleteProps> = ({ currentTopic, section, handleTopicCompleteButtonClick }) => (
  <div className='course_section m-auto flex flex-col items-center'>
    <div className='topic_complete_content min-h-[330px] flex justify-center items-center'>
      <p className='p_color text-3xl font-bold'>Woohoo! You've completed this topic!</p>
    </div>
    <button onClick={handleTopicCompleteButtonClick}>
      <motion.div className='signBtn3 min-w-[220px]' whileHover={{ scale: 1.1 }}>
        Proceed To Next Topic
      </motion.div>
    </button>
  </div>
)
