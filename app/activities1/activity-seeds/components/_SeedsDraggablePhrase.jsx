/* _SeedsDraggablePhrase.jsx */

import React from 'react'
import { useDrag } from 'react-dnd'

const SeedsDraggablePhrase = ({ id, phrase, onAddImage }) => {

    const [{ isDragging }, drag] = useDrag({
        type: 'phrase',
        item: { id: id },
        end: (item, monitor) => {
            if (monitor.didDrop()) {
                onAddImage(id)
            }
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    })

    if (isDragging) return null

    return (
        <div ref={drag} className='seeds_phrase seeds_draggable_phrase'>
            <p>{phrase}</p>
        </div>
    )
}

export default SeedsDraggablePhrase