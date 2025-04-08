'use client'

import React from 'react'
import reframeData from '../activities1/activity-reframe/components/reframe.json'
import './components/styles.css'

const ReframeReviewPage = () => {
  return (
    <div className="reframe-review-container">
      <h1>Reframe Prompts & Responses</h1>
      
      <div className="reframe-prompts-list">
        {reframeData.scenarios.map((scenario) => (
          <div key={scenario.id} className="reframe-scenario">
            <h2 className="reframe-prompt-text">{scenario.id}. {scenario.promptText}</h2>
            <div className="reframe-responses">
              {scenario.responses.map((response, idx) => (
                <div key={idx} className="reframe-response-item">
                  <p><strong>Option:</strong> {response.option}</p>
                  <p><strong>Feedback:</strong> {response.feedback}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReframeReviewPage
