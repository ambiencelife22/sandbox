/* AUTH LAYOUT */
'use client'
import React, { useEffect, useState, ReactNode, useContext } from 'react'

// import VersionContext from '../(contexts)/VersionContext'
import { FetchLocalStorage } from '../(credentials)/channel'
// import { handleConcurrencyIssue } from '@/utils/(contexts)/RedirectContext'


function AuthLayout({
    children,
}: {
    children: ReactNode
}) {

    const [user, setUser] = useState(Object)
    // const { version, setVersion } = useContext(VersionContext)
    const [pageAccess, setPageAccess] = useState(Object)

    useEffect(() => {
        const activeSession = JSON.parse(localStorage.getItem('session') || '{}')
        // const activeSessionToken = activeSession?.APISessionToken

        if (activeSession?.loginStatus !== 'Granted' && typeof window !== 'undefined') {

            //@@ NOT WORKING YET @@
            // if (activeSession?.loginStatus || activeSession.loginStatus !== 'Granted' && typeof window !== 'undefined') { 
            window.location.href = window.location.origin + '/logout-undefined'
            localStorage.clear()
            return
        }
        setUser(activeSession)

        // Check if version has changed
        const browser_version = localStorage.getItem('version')
        // if (version !== browser_version) {
        //     if (typeof window !== 'undefined') {
        //         window.location.href = window.location.origin + '/logout-versioncontrol'
        //     }
        // }

        // Check for concurrency using a masked name @@ NOT WORKING YET @@
        // const concurrencyCheckToken = localStorage.getItem('concurrencyCheck')
        // if (concurrencyCheckToken !== activeSessionToken) {
        //     if (typeof window !== 'undefined') {
        //         handleConcurrencyIssue()
        //     }
        // }

    }, [])

    useEffect(() => {

        let fetchChannel = setInterval(() => {
            FetchLocalStorage()
        }, 220000)

        return () => {
            if (fetchChannel) {
                clearInterval(fetchChannel)
            }
        }

    }, [])

    if (!user?.firstName) return <></>

    return (
        <main className='AmbienceLifeApp Woohoo'>
            {children}
        </main>
    )
}

export default AuthLayout