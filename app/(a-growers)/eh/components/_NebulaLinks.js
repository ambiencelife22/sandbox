// NebulaLinks.js
import React from 'react'
import Link from 'next/link'

export function HomeLink() {
  const Icon = () => (
    <img src='https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_home%2Fhome.svg?alt=media&token=89ad146a-48ad-416f-86c0-b66c31723fc3' alt='home icon' />
  )
  
  return (
    <Link href='/eh' passHref>
        <div className='nav_bar_item'>
            <span className='sr-only'>home</span>
                <Icon className='h-9 w-9' aria-hidden='true' />
            <span className='label'>home</span>
        </div>
    </Link>
  )
}

export const FREEBIES_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_home%2Ffcontent.svg?alt=media&token=58572ca2-8930-423e-926a-41d49b34d018'

export function FreebiesLink() {
    const Icon = () => (
      <img src={FREEBIES_IMAGE} alt='freebies icon' />
    )
    
    return (
        <Link href='/eh/freebies' passHref>
            <div className='nav_bar_item'>
                <span className='sr-only'>freebies</span>
                    <Icon className='h-9 w-9' aria-hidden='true' />
                <span className='label'>freebies</span>
            </div>
        </Link>
    )
}

export function ActivitiesLink() {
    const Icon = () => (
      <img src='https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_home%2Factivities.svg?alt=media&token=9945da26-14b8-46a2-860a-d269591472c9' alt='freebies icon' />
    )
    
    return (
        <Link href='/activities' passHref>
            <div className='nav_bar_item'>
                <span className='sr-only'>activities</span>
                    <Icon className='h-9 w-9' aria-hidden='true' />
                <span className='label'>activities</span>
            </div>
        </Link>
    )
}

export function NotebookLink() {
    const Icon = () => (
      <img src='https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_home%2Fxclusives-journal.svg?alt=media&token=fd7538cd-d6a1-4bf7-ba50-9a00dbe1bd33&_gl=1*k3b5ae*_ga*MTg5MjU4Mzg0My4xNjk1MTY1MTYz*_ga_CW55HF8NVT*MTY5NzI0NjUwMy4xNS4wLjE2OTcyNDY1MDMuNjAuMC4w' alt='freebies icon' />
    )
    
    return (
        <Link href='/notebook' passHref>
            <div className='nav_bar_item'>
                <span className='sr-only'>notebook</span>
                    <Icon className='h-9 w-9' aria-hidden='true' />
                <span className='label'>notebook</span>
            </div>
        </Link>
    )
}

export function CoursesLink() {
    const Icon = () => (
      <img src='https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_home%2Fcourses.svg?alt=media&token=24fe1919-d372-4bfd-83d4-b8837993b513' alt='courses icon' />
    )
    
    return (
        <Link href='/courses-corner' passHref>
            <div className='nav_bar_item'>
                <span className='sr-only'>courses</span>
                    <Icon className='h-9 w-9' aria-hidden='true' />
                <span className='label'>courses</span>
            </div>
        </Link>
    )
}

export const XCLUSIVES_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_home%2Fxclusives.svg?alt=media&token=0480511a-32ff-4797-8ad0-0063a4489f17'


export function XclusivesLink() {
    const Icon = () => (
        <img src={XCLUSIVES_IMAGE} alt='xclusives icon' />
    )
    
    return (
        <Link href='/eh/xclusives' passHref>
            <div className='nav_bar_item'>
                <span className='sr-only'>xclusives</span>
                    <Icon className='h-9 w-9' aria-hidden='true' />
                <span className='label'>xclusives</span>
            </div>
        </Link>
    )
}

export const LIFEDESIGN_IMAGE = 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_home%2Flifedesign.svg?alt=media&token=48566d92-bbea-4c16-a2ee-1edc3268ca4d'

  export function LifeDesignLink() {
    const Icon = () => (
        <img src={LIFEDESIGN_IMAGE} alt='life design icon' />
    )
    
    return (
        <Link href='/eh/lifedesign'>
            <div className='nav_bar_item'>
                <span className='sr-only'>life design</span>
                <   Icon className='h-9 w-9' aria-hidden='true' />
                <span className='label'>life design</span>
            </div>
        </Link>
    )
}
