/* CardsIntro.jsx */
'use client'
import React, { useState, useEffect } from 'react'

import { Transition } from 'react-transition-group'

// @@ Import external structure functions @@
import { ActivitiesLoadingAnimation } from '../../../../components/ui/loading-animation'

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
          text: 'Our CARDS activity...',
        },
        {
          id: 2,
          text: '... is the third stage of our activities...',
        },
        {
          id: 3,
          text: '... providing a moderate format to reinforce empowering phrases.',
        },
        {
          id: 4,
          text: 'The process is quite simple:\n\n1. The phrase card is revealed \n\n2. Decide if it\'s empowering or disempowering \n\n3. Keep it in your heart or throw it in the trash accordingly \n\n4. Repeat!',
        },
        {
          id: 5,
          text: 'That\'s it!',
        },
        {
          id: 6,
          text: 'You may repeat the process as many times as you\'d like!',
        },
        {
          id: 7,
          text: 'As you play this activity more and more, you\'ll notice that the progress bar will start to fill up.',
        },
        {
          id: 8,
          text: 'Once your progress bar is completely full, you\'ll unlock the next stage.\n\nThis allows you to level up...',
        },
        {
          id: 9,
          text: '... in our app and in life!',
        },
        {
          id: 10,
          text: 'P.S. We encourage you to say the empowering phrases outloud as you put them into the heart; and, again when they reappear reaffirmed!',
        },
      ]
      setExplanations(dummyData)
    }, 400)
  }

  const handleNext = () => {
    if (typeof window !== 'undefined' && currentScreen === explanations.length - 1) {
        window.location.href = '/eh'
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
    <div className='explanation_container text-[Plus Jakarta Sans] p_color'>
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
            <p>{currentExplanation.text.split('\n').map((line, index) => <React.Fragment key={index}>{line}<br /></React.Fragment>)}</p>
          </div>
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
