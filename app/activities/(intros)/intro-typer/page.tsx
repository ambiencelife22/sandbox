/* activity-seeds intro */
'use client'
import * as React from 'react'

// @@ Import Structure Functions @@
import NavBar from '../../../(a-growers)/components/NavBarActivities'
import Footer from '../../../(a-growers)/components/FooterGrowers'

// @@ Import Child Functions @@
import Explain from '../intro-typer/components/TyperIntro'


const IntroComponent: React.FC = () => {
  return (
    <main className='Woohoo'>
      <NavBar />
      <div className='lesson_container'>
        <Explain />
      </div>
      <div className='alerts'>
      </div>
      <div className='fix_footer'>
        <Footer />
      </div>
    </main>
  )
}

export default IntroComponent