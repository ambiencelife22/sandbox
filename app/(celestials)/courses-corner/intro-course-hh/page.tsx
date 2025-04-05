'use client'
import * as React from 'react'

import Explain from './components/CourseHHIntro'

const IntroComponent: React.FC = () => {
  return (
    <main className='Woohoo'>
      <div className="lesson_container">
        <Explain />
      </div>
      <div className="alerts">
      </div>
    </main>
  )
}

export default IntroComponent