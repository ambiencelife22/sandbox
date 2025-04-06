/* _TyperPhrase.jsx */
import React from 'react'

function _TyperPhrase({ themeImage, actionPhrase }) {
  return (
    <>
      <p className='typer_phrase'>
        {actionPhrase}
      </p>
    </>
  )
}

export default React.memo(_TyperPhrase)