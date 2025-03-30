/* BottomHeart.jsx */
import React from 'react'

// @@ Import utility hooks @@
import { useDrop } from 'react-dnd'

const SeedsBottomHeart =
  'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_actions%2Fimages_actions_global%2Fheart.svg?alt=media&token=7d4b7b7b-a51b-4b51-b3d6-f782baaa86f4'

const SeedsBottomHeartOpenPartial =
  'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_actions%2Fimages_actions_global%2Fheart-open-partial.svg?alt=media&token=643553da-7524-41be-b002-5f9d5164d1b9'
const SeedsBottomHeartOpenFull =
  'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_actions%2Fimages_actions_global%2Fheart-open-full.svg?alt=media&token=37b559d7-070c-4771-9b64-0d1d88c0498c'
  const BottomHeart = ({ isDragging, added, onDrop }) => {
    const [{ isOver }, drop] = useDrop({ 
        accept: 'phrase',
        drop: (item) => {
            onDrop && onDrop(item)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    })

    let heartSrc = SeedsBottomHeart

    if (isDragging && !isOver) {
      heartSrc = SeedsBottomHeartOpenPartial
    }
  
    if (isOver) {
        heartSrc = SeedsBottomHeartOpenFull
    }

    if (added) return null
  
    return (
        <div className='animate_icon' ref={drop}>
            <img src={heartSrc} className={isOver ? 'heart_open' : 'heart_close'} alt='heart' />
        </div>
    )
}

export default BottomHeart