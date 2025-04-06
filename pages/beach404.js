// lost404.js
import React from 'react'

import Link from 'next/link'

import icon from '../app/ambience-03-White.png'

import { AppStylingProvider } from '../utils/(contexts)/AppStylingContext'

const FunctionBeach404 = () => {
    return (
        <AppStylingProvider>
            <div className='relative bg-[#54005C] confirmation_page_container '>
                <div className='relative h-80 overflow-hidden  md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2'>
                    <img
                        className='h-full w-full object-cover'
                        src='https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_misc%2Fbeach.webp?alt=media&token=2340418e-ee5f-410d-a370-13d1eee7b1e5'
                        alt='A swing-seat on a beautiful Maldives beach'
                    />
                </div>
                <div className='relative mx-auto max-w-7xl py-12 sm:py-32 lg:px-8 lg:py-24'>
                    <div className='pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32 lg:tailwinmt-8'>
                        <img
                            className='mx-auto w-auto h-20 relative z-10'
                            src={icon.src}
                            alt='ambience.LIFE'
                        />
                        <h1 className='invisible'>
                            404
                        </h1>
                        <h2 className='pjs p_color text-center mt-2 text-3xl font-bold tracking-tight sm:text-4xl'>
                            Marooned!
                        </h2>
                        <p className='pjs p_color text-center mt-4 text-base leading-7'>
                            This area is a deserted island...
                        </p>
                        <p className='pjs p_color text-center mt-4 text-base leading-7'>
                        ... isn't that a beach!
                        </p>
                        <div className='flex justify-center max-w-1/2'>
                            <p className='pjs p_color mt-4 text-sm text-center leading-7 w-full'>
                                <Link className='signupBtn pjs mt-8 block rounded-xl bg-[#54005C] pt-4 text-center text-sm' href={'/'}>
                                    Return To Familiar Shores
                                </Link>
                            </p>
                        </div>
                        <p className='pjs text-[#a8a8a8] text-center mt-44 text-xs'>
                            Or... you can leave our site and services to play some<br />
                            <span className='link_offwhite_hover_blue'>
                                <a href='https://freeinvaders.org/' target='_blank'>
                                    Space Invaders* for free
                                </a>
                            </span>
                        </p>
                        <p className='pjs text-[#a8a8a8] text-center pt-2 text-xs'>
                            * NOTE: We are not responsible for what happenes next...  
                        </p>    
                    </div>
                </div>
            </div>
        </AppStylingProvider>
    )
  }
  
  export default FunctionBeach404
