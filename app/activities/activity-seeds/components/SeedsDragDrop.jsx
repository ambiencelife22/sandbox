/* SeedsDragDrop.jsx */
import React from 'react'
import { useDrop, useDrag } from 'react-dnd'

// @@ Import partner functions @@
import BottomHeart from './_BottomHeart'
import SeedsDraggablePhrase from './_SeedsDraggablePhrase'

const DragDrop = ({
    id,
    phrase,
    added,
    PictureList,
    setAdded,
    setShowDroppedSentence,
    setDone
  }) => {

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'phrase',
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'phrase',
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  const addImageToBoard = (id) => {
    const pictureItem = PictureList.find((picture) => id === picture.id)
    setAdded(true)
    setShowDroppedSentence(true)

    if (!added) {
        setTimeout(() => {
            setDone(true)
        }, 1100)
    }
  }

  return (
    <div className='drag_drop'>
        {added ? null : (
          <>
            <SeedsDraggablePhrase
              id={id}
              phrase={phrase}
              onAddImage={addImageToBoard}
              isDragging={isDragging}
              drag={drag}
            />
            <BottomHeart
              id={id}
              drop={drop}
              isDragging={isDragging}
              added={added}
            />
          </>
        )}
    </div>
  )
}

export default DragDrop
