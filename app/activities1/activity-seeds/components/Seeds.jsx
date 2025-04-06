/* Seeds.jsx */
// Sets SCENE
import React, { useEffect, useState, useCallback } from 'react'

// @@ Import utilities @@
import { HTML5toTouch } from 'rdndmb-html5-to-touch'
import { DndProvider, usePreview } from 'react-dnd-multi-backend'

// @@ Import partner functions @@
import SeedsController from './SeedsController'

const PhrasePreview = ({ phrase }) => {
  const preview = usePreview()
  if (!preview.display) {
    return null
  }
  const { style } = preview

  return (
    <div className='dragging_phrase' style={style}>
      <p>{phrase}</p>
    </div>
  )
}

function ActivitySeeds({
  setFinalResult,
  PictureList,
  finalResult,
  handleNextPhrase,
  showStartButton,
  setShowStartButton
}) {

  function setFinalResultFromParent() {
    setFinalResult(true)
  }

  const [randomNumber, setRandomNumber] = useState(0)
  const [resetSeeds, setResetSeeds] = useState(false)
  const [done, setDone] = useState(false)

  const [added, setAdded] = useState(false)

  const handlePhrase = useCallback(() => {
    const randomNumber = Math.floor(Math.random() * PictureList.length)
    setRandomNumber(randomNumber)
    setDone(false)
    setAdded(false)
    setResetSeeds(false)
}, [PictureList])


  useEffect(() => {
    handlePhrase()
  }, [])


  return (
      <>
        <DndProvider options={HTML5toTouch}>
        {PictureList[randomNumber] && <PhrasePreview phrase={PictureList[randomNumber].actionPhrase} />}
            {finalResult ? null : (
              <SeedsController
                PictureList={PictureList}
                actionPhrase={PictureList[randomNumber].actionPhrase}
                randomNumber={randomNumber}
                setRandomNumber={setRandomNumber}
                added={added}
                resetSeeds={resetSeeds}
                setResetSeeds={setResetSeeds}
                setAdded={setAdded}
                setDone={setDone}
                done={done}
                id={PictureList.id}
                handleNextPhrase={handleNextPhrase}
                showStartButton={showStartButton}
                setShowStartButton={setShowStartButton}         
              />
            )}
        </DndProvider>
      </>
  )
}

export default React.memo(ActivitySeeds)
