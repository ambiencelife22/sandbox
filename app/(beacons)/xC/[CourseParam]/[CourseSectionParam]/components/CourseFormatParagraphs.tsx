/* CourseFormatParagraphs.tsx */
import React from 'react'

import { motion } from 'framer-motion'

export const CourseFormatParagraphs = (text: any) => {

  const splitText = (text: string) => {
    return text.split('').map((letter, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0 }} // Initial opacity is 0
        animate={{ opacity: 1 }} // Animate opacity to 1
        transition={{ delay: index * 0.05 }} // Stagger the delay for each letter
      >
        {letter}
      </motion.span>
    ))
  }

  const processLineBreaks = (inputText: string) => {
    return inputText.split('\n').map((item: any, key: any, array: any[]) => (
      <React.Fragment key={key}>
        {item}
        {key < array.length - 1 && <br />} {/* Add line break only if not the last item in the array */}
      </React.Fragment>
    ))
  }

  const processContent = (content: string) => {
    return content.split(/(<em>.*?<\/em>|<center>.*?<\/center>)/g).map((part: any, index: any) => (
      part.startsWith('<em>') ? (
        <span key={index} className='italic -pt[-1em] -pb-[-1em]'>
          {part.substring(4, part.length - 5)}
        </span>
      ) : part.startsWith('<center>') ? (
        <div key={index} className='text-center'>
          {part.substring(8, part.length - 9)}
        </div>
      ) : (
        part
      )
    ));
  }

  if (text && (text.includes('<em>') || text.includes('<center>'))) {
    const replacedText = text.split(/(<em>.*?<\/em>|<center>.*?<\/center>)/g).map((part: any, index: any) => {
      return part.startsWith('<center>') ? (
        <motion.div 
          key={index} 
          className='text-center font-extrabold italic text-2xl mt-[88px]'
          initial={{ opacity: 0, scale: 1 }}
          animate={{
            opacity: 1,
            scale: [1, 2.2, 1],
            transition: { duration: 2.2, delay: index * 0.1 }
          }}
        >
          {processContent(part)}
        </motion.div>
      ) : (
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 1 }}
          animate={{
            opacity: 1,
            scale: [1, 2.2, 1],
            transition: { duration: 2.2, delay: index * 0.1 }
          }}
        >
          {processContent(part)}
        </motion.span>
      )
    })
  
    return <>{replacedText}</>
  }

  return text ? processLineBreaks(text) : null
}
