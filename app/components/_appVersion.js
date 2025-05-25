'use client'
import React, { useEffect, useState } from 'react'

function _appVersion() {
    const [version, setVersion] = useState('')

    useEffect(() => {
        setVersion(localStorage.getItem('version'))
    })

    return (
        <>Version: {version}</>
    )
}

export default _appVersion