/* CourseSectionFinalPage.tsx */
import React, { FC } from 'react'

// @@ Import aux hooks @@
import { motion } from 'framer-motion'

interface CourseSectionFinalPageProps {
  urlParam: any
}





export const CourseSectionFinalPage: FC<CourseSectionFinalPageProps> = ({ urlParam }) => {

  const pathParts = window.location.pathname.split('/')
  const courseUrl = `/${pathParts[2]}`
  const courseSectionUrl = `/${pathParts[3]}`

  const handleNextClick = (urlParam: any) => {
    if (typeof window !== 'undefined') {
      window.location.href = `/xC/${courseUrl}/${courseSectionUrl}`
    }
  }

    return (
      <div className='max-w-[660px] p_color space-y-4 m-auto pt-[44px]'>
        <div className='courses_complete p_color'>
          <h2 className='text-2xl text-center font-bold p_color'>
            Woohoo!
          </h2>
          <p className='text-center'>
            You've completed this section of the course!
          </p>
        </div>
        <div className='flex justify-center z-50'>
          <button onClick={() => handleNextClick(urlParam)}>
            <motion.div className='signBtn3 min-w-[110px]' whileHover={{ scale: 1.1 }}>
              Finish
            </motion.div>
          </button>
        </div>
        
      </div>
    )
  }