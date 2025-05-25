'use client'
import React, { useState, useEffect, useRef } from 'react'

import Link from 'next/link'
import { motion } from 'framer-motion'

function ActivityIntroContent({ activityType, initialTimer, setOpen, onClose, activityTheme }) {
    const [gameURL, setGameURL] = useState('')
    const [localTimer, setlocalTimer] = useState(initialTimer)

    const modalRef = useRef(null)

    function handleCloseModal(buttonTextId) {
        setOpen(true, buttonTextId)
    }

    function handleKeyDown(event) {
        if (event.key === 'Escape') {
            onClose()
        }
    }


    useEffect(() => {
        // Focus on the modal when it is opened
        if (modalRef.current) {
            modalRef.current.focus()
        }
    }, [])

    useEffect(() => {
        function trapFocus(event) {
            if (!modalRef.current) return

            const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [contenteditable], [tabindex]:not([tabindex="-1"])'
            const focusableElements = Array.from(modalRef.current.querySelectorAll(focusableElementsString))

            const firstFocusableEl = focusableElements[0]
            const lastFocusableEl = focusableElements[focusableElements.length - 1]

            // If there's only one focusable element
            if (firstFocusableEl === lastFocusableEl) {
                if (event.key === 'Tab') {
                    event.preventDefault()
                }
                return
            }

            // If shifting tabbing and currently on the first element, focus the last element
            if (event.key === 'Tab' && event.shiftKey && document.activeElement === firstFocusableEl) {
                lastFocusableEl.focus()
                event.preventDefault()
            }

            // If tabbing and currently on the last element, focus the first element
            if (event.key === 'Tab' && !event.shiftKey && document.activeElement === lastFocusableEl) {
                firstFocusableEl.focus()
                event.preventDefault()
            }
        }

        // When the modal is opened, focus on the first tabbable element
        if (modalRef.current) {
            const focusableElements = Array.from(modalRef.current.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [contenteditable], [tabindex]:not([tabindex="-1"])'))
            const firstFocusableEl = focusableElements[0]
            firstFocusableEl && firstFocusableEl.focus()
        }

        if (typeof window === 'undefined') return

        window.addEventListener('keydown', trapFocus)

        return () => {
            window.removeEventListener('keydown', trapFocus)
        }

    }, [])


    useEffect(() => {
        const constructedURL = `/activities/activity-`.concat(activityType.toLowerCase())
        setGameURL(constructedURL)
    }, [activityType])


    return (
        <main className='main main_welcome_screen max-w-[1216px] m-auto'>

            <div className='activity_intro_modal'
                onKeyDown={handleKeyDown}
                ref={modalRef}  // attach the ref to the modal
                tabIndex={-1}   // make the modal focusable without affecting tab order
                role='dialog'   // identify this div as a dialog to screen readers
            >

                <motion.div
                    initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}
                >
                    <div className='intro'>
                        <div className='intro_card_close'>
                            <button onClick={onClose} className="cursor-pointer" tabIndex={0}><span className='inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#81038f] shadow-md text-[22px] cursor-pointer'>X</span></button>
                        </div>
                        <div className='intro_card_image'>
                            <div className='intro_card_title'>
                                <h3 className='capitalize'>{activityTheme} &mdash; {activityType}</h3>
                                <h4>{/* Need to dynamically call in Activity Description */}Let's start filing our heart with empowering phrases!</h4>
                            </div>
                        </div>
                        <div className='intro_card_stats'>
                            <div>
                                <p>Themes</p>
                            </div>
                            <div className='text-right'>
                                <button className='w-[48px]' onClick={() => handleCloseModal('ThemeBtn')} tabIndex={0}>
                                    <img src='https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_themes%2Ftheme-11aff-gratitude.svg?alt=media&token=7ae70c73-355f-47fe-91ef-fce1e8393218' alt='ambience.LIFE Gratitude Icon' />
                                </button>
                            </div>
                            <div>
                                <p>Timer</p>
                            </div>
                            <div className='text-right relative'>
                                <button id='dynamic_activity_time_setter' className=' p_color mt-2' onClick={() => handleCloseModal('TimerInfoBtn')} tabIndex={0}>
                                    {localTimer + `:00`}
                                </button>
                            </div>
                            <div>
                                <p>Skills</p>
                            </div>
                            <div className='text-right'>
                                <button className='w-[48px]' onClick={() => handleCloseModal('SkillBtn')} tabIndex={0}>
                                    <img src='https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_ai%2Fambience-03-White.webp?alt=media&token=3900ed7f-f605-4ca5-9ae8-6127bbc252fb' alt='ambience.LIFE Logo' />
                                </button>
                            </div>
                            <div className='intro_card_button'>
                                <Link href={gameURL}>
                                    <button className='w-[100%] text-slate-100 video_length_points flex justify-between items-center gap-x-2 rounded-md bg-[#81188f] px-3.5 py-2.5 text-sm font-semibold p_color shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 items-center' tabIndex={0}>Let's Begin!</button>
                                </Link>
                            </div>
                        </div>
                        <div className='fix_footer'>
                        </div>
                    </div>
                </motion.div>
            </div>

        </main>
    )
}

export default ActivityIntroContent