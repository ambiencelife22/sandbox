// @@ activity-reframe/page.tsx @@

'use client'

import React, { useState } from 'react'
import reframeData from './components/reframer.json'
import './components/reframer.css'
import { motion, AnimatePresence } from 'framer-motion'

const ReframeGame = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [step, setStep] = useState(1) // 1 = prompt, 2 = feedback, 3 = journal
  const [selected, setSelected] = useState<number | null>(null)
  const [journalEntry, setJournalEntry] = useState('')
  const [journalEntryVisible, setJournalEntryVisible] = useState(false)

  const currentScenario = reframeData.scenarios[currentIndex]

  const handleNext = () => {
    // If we're in Step 3 or journaling is visible, go to Step 4 (intermediary screen)
    if (step === 3 || journalEntryVisible) {
      setStep(4) // Go to intermediary screen
      setTimeout(() => {
        // After 1.5 seconds, go to next scenario (Step 1)
        setStep(1)
        setJournalEntry('') // Reset journal entry for next round
        setJournalEntryVisible(false) // Hide journal textbox

        // Send the payload when moving to the next scenario
        sendPayload()
      }, 4400) // 4.4-second delay
    }

    // If we're in Step 2 and response is selected, move to Step 3
    if (step === 2 && selected !== null) {
      setStep(3)
    }

    // If we're in Step 1, proceed to Step 2
    if (step === 1 && selected !== null) {
      setStep(2)
    }
  }

  const sendPayload = async () => {
    // Prepare the payload with the necessary data
    const payload = {
      scenarioId: currentScenario.id,
      response: currentScenario.responses[selected!].option,
      feedback: currentScenario.responses[selected!].feedback,
      journalEntry: journalEntry, // Send journal entry if available
      timestamp: new Date().toISOString(),
    }

    try {
      // Sending data to a mock API endpoint (you should replace this with your actual API)
      const response = await fetch('/api/reframe/save-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to send response')
      }

      console.log('Payload sent successfully:', payload)
    } catch (error) {
      console.error('Error sending payload:', error)
    }
  }

  return (
    <div className="reframe-container">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="reframe-prompt">{currentScenario.promptText}</h2>
            {currentScenario.responses.map((response, idx) => (
              <button
                key={idx}
                className={`reframe-option ${selected === idx ? 'selected' : ''}`}
                onClick={() => {
                  setSelected(idx)
                  setStep(2)
                }}
              >
                {response.option}
              </button>
            ))}
          </motion.div>
        )}

        {step === 2 && selected !== null && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="reframe-prompt">
              <h2>{currentScenario.promptText}</h2>
            </div>

            <div className="reframe-selected-option">
              <strong>Your response:</strong> “{currentScenario.responses[selected].option}”
            </div>

            <div className="reframe-feedback">
              <p>{currentScenario.responses[selected].feedback}</p>
            </div>

            <button className="reframe-submit-btn" onClick={() => setStep(3)}>
              Next
            </button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <label className="reframe-journal-label">
              Want to journal anything about this?
            </label>
            <div className="reframe-journal-options">
              <button
                className="reframe-option"
                onClick={() => setJournalEntryVisible(true)}
              >
                Yes
              </button>
              <button
                className="reframe-option"
                onClick={handleNext}
              >
                No
              </button>
            </div>

            {journalEntryVisible && (
              <>
                <textarea
                  className="reframe-journal-textarea"
                  value={journalEntry}
                  onChange={(e) => setJournalEntry(e.target.value)}
                  rows={4}
                />
                <button className="reframe-submit-btn" onClick={handleNext}>
                  Submit & Continue
                </button>
              </>
            )}
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="reframe-intermediary-screen">
              <h2>You're doing great! Preparing your next scenario...</h2>
              <p>Please take a deep breath and get ready for the next one.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ReframeGame
