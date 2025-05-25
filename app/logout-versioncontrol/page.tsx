/* logout-versioncontrol/page.tsx */
'use client'
import React, { useContext, useEffect, useState } from 'react'

// @@ Import external structure functions @@
import { DotsLoadingAnimation } from '../../components/ui/loading-animation'

// @@ Import local storage hooks @@
import { clearLocalStorageExcept } from '../../utils/(contexts)/ClearLocalStorageExcept'

// @@ Import version control @@
import VersionContext from '../../utils/(contexts)/VersionContext'
import _appVersion from '../components/_appVersion'

// @@ Import AL emblem
import icon from '../ambience-03-White.png'

function LogoutPage() {

    const { version, setVersion } = useContext(VersionContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let domain = (new URL(window.location.href))
        clearLocalStorageExcept(['al-remember', 'remember-login'])
        localStorage.setItem('version', version)

        const timeout = setTimeout(() => {
            setLoading(false)
        }, 1100)

        return () => clearTimeout(timeout)
    }, [])

    if (loading) {
        return <div className='flex justify-center items-center min-h-screen'>
                    <DotsLoadingAnimation />
                </div>
    }


    return (
        <main className='Woohoo'>
            <div className='wrapper theme_bg pb-[121px]'>
                <div className='flex min-h-full items-center justify-center py-8 px-4 sm:px-6 lg:px-8  h-[90vh] dark text-light mb-[-50px]'>
                    <div className='w-full max-w-md space-y-8'>
                        <div>
                            <img
                                className='mx-auto w-auto h-40 relative z-10'
                                src={icon.src}
                                alt='ambience.LIFE'
                            />
                            <h2 className='font-[prata] p_color mt-4 text-center text-3xl font-bold tracking-tight relative'>
                                Hi! We just updated our app!
                            </h2>
                            <h3 className='pjs p_color mb-8 text-center text-xl tracking-tight'>
                                We do this regularly!
                            </h3>
                            <h3 className='pjs p_color mb-11 text-center text-xl tracking-tight'>
                                We apologize for any inconvenience this may have caused... but, we promise it's well worth it!
                            </h3>
                        </div>
                        <div className='mt-[44px]'>
                            <p className='font-[prata] font-medium text-center'>
                                <span className='signup_login_blurb text-[#a8a8a8]'>
                                    Want to get back in?
                                </span> <span className='signup_login_link_blurb'>
                                    <a href={'/'} className='hover:underline'>Login here</a>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className='app_version_container flex w-full justify-center w-auto mt-4 pb-4'>
                    <p className='app_version font-[prata] p_color pt-4 sm:pt-0 font-thin text-xs text-center sm:text-right'>
                        <_appVersion />
                    </p>
                </div>
            </div>
        </main>
    )
}

export default LogoutPage

