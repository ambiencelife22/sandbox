/* _TyperInputWithSubmit.jsx */
import React, { useRef } from 'react'

function TyperInputWithSubmit({ inputValue, setInputValue, onEnter }) {
    const inputRef = useRef(null)

    const handleChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleSubmit = () => {
        onEnter()
    }

    return (
        <>
            <input
                ref={inputRef}
                id='Activity Typer Input'
                name='Activity Typer Input'
                type='text'
                className='typer_input_box mt-4'
                value={inputValue}
                onChange={handleChange}
                placeholder='Type the phrase here'
                autoFocus
            />
            <div className='typer_submit_button_container'>
                <button
                    aria-label='Submit'
                    className='typer_submit_button font-[Plus Jakarta Sans] mt-4 block rounded-xl bg-[#54005C] text-center'
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </>
    )
}

export default TyperInputWithSubmit
