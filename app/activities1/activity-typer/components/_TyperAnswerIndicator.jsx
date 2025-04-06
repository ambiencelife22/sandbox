/* _TyperAnswerIndicator.jsx */
import { CheckMarkWhite, XMark } from '../../../components/SVG'

import React from 'react'

function _TyperAnswerIndicator({ isActive, isCorrect, hideIndicator }) {
    return (
        <div className={isActive && !hideIndicator ? 'typer_validation animate__animated animate__jackInTheBox' : 'inactive done'}>
            {isActive && (isCorrect ? <CheckMarkWhite /> : <XMark />)}
        </div>
    )
}

export default  React.memo(_TyperAnswerIndicator)