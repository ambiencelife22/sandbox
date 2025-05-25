/* CoursesCornerIntro.jsx */
import React, { useState, useEffect } from 'react'

import { Transition } from 'react-transition-group'

// @@ Import external structure functions @@
import { CoursesLoadingAnimation } from '../../../../../components/ui/loading-animation'

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
          text: 'Our Courses Corner was created as an environment for education and introspection.',
        },
        {
          id: 2,
          text: 'It\'s a simple, yet powerful resource that allows you to learn, reflect, and challenge your understanding of the topic at hand.',
        },
        {
          id: 3,
          text: 'We believe at the very core of a happier, healthier, more fulfilling life, it\'s absolutely critical to continue learning, exploring, growing, and seeking topics that expand your horizons...',
        },
        {
          id: 4,
          text: 'The process is quite simple:\n\n1. Select a course\n\n2. Review its content\n\n3. Engage with the quizes and prompts at the end',
        },
        {
          id: 5,
          text: 'You may repeat the process as many times as you\'d like!',
        },
        {
          id: 6,
          text: 'We\'ll be launching additional courses in the near future. Stay tuned!',
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
