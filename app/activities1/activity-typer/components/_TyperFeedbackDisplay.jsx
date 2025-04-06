/* _TyperFeedbackDisplay.jsx */

import _AnswerIndicator from './_AnswerIndicator'

function _TyperFeedbackDisplay({ active, active2, active3, displayAnswer, currentPhrase }) {
    return (
        <div className='card_done_container'>
            <div className='answer_valid_indicator_container'>
                <_AnswerIndicator isActive={active} isCorrect={true} />
                <_AnswerIndicator isActive={active2} isCorrect={false} />
            </div>
            <div className={active3 ? 'active3' : 'inactive3'}>
                <div className={displayAnswer ? 'bg_green_typer' : 'bg_red_typer'}>
                    <div className='card_wrapper'>
                        <p className='typer_phrase'>
                            {currentPhrase}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default _TyperFeedbackDisplay
