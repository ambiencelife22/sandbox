/* ActivitiesIntro.jsx */
'use client'
import React, { useState, useEffect } from 'react'

import { Transition } from 'react-transition-group'

// @@ Import external structure functions @@
import { ActivitiesLoadingAnimation } from '@/components/ui/loading-animation'

const Explain = () => {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [fade, setFade] = useState(false)
  const [explanations, setExplanations] = useState([])

  useEffect(() => {
    fetchExplanations() // Simulate fetching explanations from a database
  }, [])

  useEffect(() => {
    setFade(true)
  }, [currentScreen])

  const fetchExplanations = () => {
    // Simulate asynchronous fetching of explanations from a database
    setTimeout(() => {
      const dummyData = [
        {
          id: 1,
          text: 'Introducing our ACTIVITIES section!',
        },
        {
          id: 2,
          text: 'Our interactive activities utilize the power of words.',
        },
        {
          id: 3,
          text: 'Engage with hundreds of phrases in multiple formats to reinforce self-empowering thoughts.',
        },
        {
          id: 4,
          text: 'Each activity has it\'s own intro section found here:',
          linkerdoodle: '/activities/intro-activity-intros'
        },
        {
          id: 5,
          text: 'Let happiness, healthiness, and fulfillment be as much a part of you as breathing, drinking, eating, sleeping, and — most importantly — your will to be.',
        },
        {
          id: 6,
          text: 'The more you participate in these activities, the more themes you\'ll unlock over time.',
        },
        {
          id: 7,
          text: 'That\'s it!',
        },
        {
          id: 8,
          text: 'You may repeat the process as many times as you\'d like!',
        },
        {
          id: 9,
          text: 'As you play these activities more and more, you\'ll notice that the progress bars of your selected activity and theme will start to fill up.',
        },
        {
          id: 10,
          text: 'Once a progress bar is completely full, you\'ll unlock subsequent activities and themes.\n\nThis allows you to level up...',
        },
        {
          id: 11,
          text: '... in our app and in life!',
        },
      ]
      setExplanations(dummyData)
    }, 400)
  }

  const handleNext = () => {
    if (typeof window !== 'undefined' && currentScreen === explanations.length - 1) {
        window.location.href = '/xclusives'
    }

    if (currentScreen < explanations.length - 1) {
        setCurrentScreen(currentScreen + 1)
    }
  }

  const finishButton = {
    text: 'Finish',
    url: '/activities',
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
          onEnter={(node) => {
            node.style.opacity = 0
            node.style.transform = 'translateX(0)'
          }}
          onEntered={(node) => (node.style.opacity = 1)}
          onExit={(node) => (node.style.opacity = 0)}
        >
          <div className='explanations_container flex flex-col w-[88%]'>
            <div style={{ maxWidth: '80%', margin: '0 auto' }}>
              <p className='max-w-[660px] text-left'>
                {currentExplanation.text.split('\n').map((line, index) => (
                  <React.Fragment key={index}>{line}<br /></React.Fragment>
                ))}
              </p>
            </div>
            {currentExplanation && currentExplanation.linkerdoodle && (
              <div className='linkerdoodle_text_link p_color text-[Plus Jakarta Sans] mt-2 m-auto'>
                <a 
                  href={currentExplanation.linkerdoodle} 
                  className='underline hover:text-[#7FDEFF] focus:text-[#7FDEFF] cursor-pointer' 
                  onClick={(e) => {
                    e.preventDefault()
                    window.open(currentExplanation.linkerdoodle, '_blank')
                  }}
                >
                  Go to Activity Intros
                </a>
              </div>
            )}
          </div>
        </Transition>
      ) : (
        <div className='flex justify-center items-center min-h-screen'>
          <ActivitiesLoadingAnimation />
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
