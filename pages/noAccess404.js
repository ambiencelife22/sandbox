// noAccess404.js
import React from 'react'

import Link from 'next/link'
import Image from 'next/image'

import icon from '../app/ambience-03-White.png'

import { AppStylingProvider } from '../utils/(contexts)/AppStylingContext'

const FunctionNoAccess404 = () => {
    return (
        <AppStylingProvider>
            <div className='relative bg-[#54005C] confirmation_page_container z-[9999]'>
                <div className='relative h-80 overflow-hidden  md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2'>
                    <Image
                        className='h-full w-full object-cover'
                        src='https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_misc%2Fsurgarsnap-peas.webp?alt=media&token=d96c19b7-ef89-4eef-8e31-175bb29ef03d'
                        alt='Sugar Snap Peas Error karolina-kolodziejczak-Rfj__gAEQXM-unsplash'
                        width={800}
                        height={600}
                    />
                </div>
                <div className='relative mx-auto max-w-7xl py-12 sm:py-32 lg:px-8 lg:py-24'>
                    <div className='pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32 lg:tailwinmt-8'>
                        <Image
                            className='mx-auto w-auto h-20 relative z-10'
                            src={icon.src}
                            alt='ambience.LIFE'
                            width={80}
                            height={80}
                        />
                        <h1 className='invisible'>
                            404
                        </h1>
                        <h2 className='pjs p_color text-center mt-2 text-3xl font-bold tracking-tight sm:text-4xl'>
                            awww, sugar snap!
                        </h2>
                        <p className='pjs p_color text-center mt-4 text-base leading-7'>
                            It seems like you don&apos;t have permisson to view this page!
                        </p>
                        <p className='pjs p_color text-center mt-4 text-base leading-7'>
                            But, don&apos;t worry... you&apos;re still part of the pod!
                        </p>
                        <div className='flex justify-center max-w-1/2'>
                            <p className='pjs p_color mt-4 text-sm text-center leading-7 w-full'>
                                <Link className='signupBtn pjs mt-8 block rounded-xl bg-[#54005C] pt-4 text-center text-sm' href={'/'}>
                                    Back to the Home Garden
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
  
  export default FunctionNoAccess404
