/* activity-scramble intro */
'use client'
import * as React from 'react'

// @@ Import Structure Functions @@
// import NavBar from '@/app/(a-growers)/components/NavBarActivities'
// import Footer from '@/app/(a-growers)/components/FooterGrowers'

// @@ Import Child Functions @@
import Explain from './components/ScrambleIntro'


const IntroComponent: React.FC = () => {
  return (
    <main className='Woohoo'>
      {/* <NavBar /> */}
      <div className='lesson_container'>
        <Explain />
      </div>
      <div className='alerts'>
      </div>
      <div className='fix_footer'>
        {/* <Footer /> */}
      </div>
    </main>
  )
}

export default IntroComponent