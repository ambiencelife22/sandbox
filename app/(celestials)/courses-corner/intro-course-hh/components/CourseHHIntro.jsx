/* CoursesCornerIntro.jsx */
import React, { useState, useEffect } from 'react'

import { Transition } from 'react-transition-group'

// @@ Import external structure functions @@
import { CoursesLoadingAnimation } from '@/components/ui/loading-animation'

const Explain = () => {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [fade, setFade] = useState(false)
  const [explanations, setExplanations] = useState([])

  useEffect(() => {
    fetchExplanations()
  }, [])

  useEffect(() => {
    setFade(true)
  }, [currentScreen])

  const fetchExplanations = () => {
    
    setTimeout(() => {
      const dummyData = [
        {
          id: 1,
          text: 'Welcome to\nHuman Harmony: Ignite The Power Of The Human Needs, Unleash Your Potential',
        },
        {
          id: 2,
          text: 'Our inaugural course is a power tool of transformation, informing you, guiding you, and encouraging on your path from where you are to where you want to be.',
        },
        {
          id: 3,
          text: 'In the eye-opening first segment of this transformative journey, we delve into the intricate mysteries that guide our thoughts, shape our emotions, and propel us into action.',
        },
        {
          id: 4,
          text: 'We unearth human behavior through a powerful lens: The Human Needs Concept.',
        },
        {
          id: 5,
          text: 'Brace yourself: this isn\'t your average lifestyle course — it\'s an adventure of self-discovery.',
        },
        {
          id: 6,
          text: 'In the jam-packed middle section, each human need takes center stage, radiating like a star as we map, explore, and illuminate the key signposts to personal evolution... and, revoution.\n\nTake a deep breath as we plunge into the heart of what drives us.',
        },
        {
          id: 7,
          text: 'Then, the grand finale awaits... we bring it all together into a meticulously crafted blueprint for your own personal revolution.',
        },
        {
          id: 8,
          text: 'Learn to understand, orchestrate, and incorporate your unique formula for human needs mastery.',
        },
        {
          id: 9,
          text: 'The odyssey of self-discovery is about to take a turning point towards your extraordinary future... one where the possibilities are as limitless as your newfound potential.',
        },
        {
          id: 10,
          text: 'Get ready for a journey that doesn\'t just teach you concepts, but lights a constellation of insights to guide you toward your own transformative path.',
        }
      ]
      setExplanations(dummyData)
    }, 1100)
  }

  const handleNext = () => {
    if (currentScreen === explanations.length - 1) {
      window.location.href = '/eh'
      return
    } 
    
    if (currentScreen < explanations.length - 1) {
      setCurrentScreen(currentScreen + 1)
    }
}


  const finishButton = {
    text: 'Finish',
    url: '/courses-corner',
  }

  const currentExplanation = explanations.find((explanation) => explanation.id === currentScreen + 1)

  return (
    <div className='explanation_container text-[Plus Jakarta Sans] p_color min-w-[300px]'>
      {explanations.length > 0 ? (
        <Transition
          in={fade}
          timeout={300}
          mountOnEnter
          unmountOnExit
          onEnter={(node) => (node.style.opacity = 0)}
          onEntered={(node) => (node.style.opacity = 1)}
          onExit={(node) => (node.style.opacity = 0)}
        >
          <div className='explanations_container flex flex-col w-[88%]'>
            <div style={{ maxWidth: '80%', margin: '0 auto' }}>
            {currentExplanation && (
              <p className='max-w-[660px] text-left'>
                {currentExplanation.text.split('\n').map((line, index) => (
                  <React.Fragment key={index}>{line}<br /></React.Fragment>
                ))}
              </p>
            )}
            </div>
          </div>
        </Transition>
      ) : (
        <div className='flex justify-center items-center min-h-screen'>
          <CoursesLoadingAnimation />
        </div>
      )}

      <div className='buttons  mt-10 flex gap-2'>
        {currentScreen !== 0 && (
          <button className='previous_button w-[100%] text-slate-100 justify-between items-center gap-x-2 rounded-md bg-[#81188f] px-3.5 py-2.5 text-sm font-semibold p_color shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 items-center rounded' onClick={() => setCurrentScreen(currentScreen - 1)}>
            Previous
          </button>
        )}
        {currentScreen !== explanations.length - 1 ? (
          <button className='next_button w-[100%] text-slate-100 justify-between items-center gap-x-2 rounded-md bg-[#81188f] px-3.5 py-2.5 text-sm font-semibold p_color shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 items-center rounded text-center' onClick={handleNext}>
            Next
          </button>
        ) : (
          <button className='finish_button w-[100%] text-slate-100 justify-between items-center gap-x-2 rounded-md bg-[#81188f] px-3.5 py-2.5 text-sm font-semibold p_color shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 items-center rounded' style={{ marginLeft: '22px' }} onClick={() => window.location.href = finishButton.url}>
            {finishButton.text}
          </button>
        )}
      </div>
    </div>
  )
}

export default Explain
