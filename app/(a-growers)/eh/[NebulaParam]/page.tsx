


'use client'
import React, { useState, useEffect } from 'react'

// @@ Error Handling
import FunctionBeach404 from '../../../../pages/beach404'

// @@ Import layout functions @@
import BrickContainer from '../../eh/components/_BrickContainer'
import BrickCelestial from '../components/_BrickCelestial'
import BrickCelestialCustom from '../components/_BrickCelestialCustom'
import BrickXclusivesIntro from '../components/_BrickXclusivesIntro'
import BrickCelestialCustomXTLink from '../components/_BrickCelestialCustomXTLink'
import Header from '../header'
import { XCLUSIVES_IMAGE, LIFEDESIGN_IMAGE, FREEBIES_IMAGE } from '../../eh/components/_NebulaLinks'
import { TELEGRAM_IMAGE } from '../../eh/components/_SMLinks'

interface NebulaParams {
  NebulaParam: string
}

interface PageProps {
  params: Promise<NebulaParams>
}

const fetchNebulaData = [
  {
    id: 1,
    contentImg: FREEBIES_IMAGE,
    contentImgAlt: 'Freebies',
    captionetta: 'Freebies',
    contentStatus: 'Unlocked',
    NebulaParam: 'freebies',
    pageDescrip1: 'Semi-interactive, non-personalized features available for everyone!',
    pageDescrip2: 'Includes our Curated Content and Destinations features... Aware members gain access to Daily Diary Express',
    premium: 'NO',
    subItems: [
      {
        id: 1.1,
        contentImg: 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_home%2Fcc.svg?alt=media&token=413882c8-064c-443c-a715-372244beb478',
        imagetwo: null,
        contentImgAlt: 'Curated Content',
        captionetta: 'Curated Content',
        contentStatus: 'Launched',
        CelestialParam: 'curated-content',
        pageDescrip1: 'Over 1,000 hand-selected videos with over 190 hours of content covering more than 60 topics related to a happier, healthier, more fulfilling life',
        pageDescrip2: 'Progress unlocks more content (Aware, Glow, Glow+, and Ambience members get content fully-unlocked',
        premium: 'NO',
      },
      {
        id: 1.2,
        contentImg: 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_home%2Fdestinations.svg?alt=media&token=aa934fb9-08d5-41a5-a371-a88ff7332f54',
        imagetwo: null,
        contentImgAlt: 'Destinations',
        captionetta: 'Destinations',
        contentStatus: 'Launched',
        CelestialParam: 'destinations',
        premium: 'NO',
      },
      {
        id: 1.3,
        contentImg: 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_home%2Fmm.svg?alt=media&token=632fd980-aebe-45b5-b5d2-a481b9808099',
        imagetwo: null,
        contentImgAlt: 'Mindful Moments',
        captionetta: 'Mindful Moments',
        contentStatus: 'Launched',
        CelestialParam: 'mm',
        premium: 'NO',
      },
      // {
      //   id: 1.4,
      //   contentImg: TELEGRAM_IMAGE,
      //   imagetwo: null,
      //   contentImgAlt: 'ambience.LIFE Telegram Free Content',
      //   captionetta: 'Telegram Topics',
      //   contentStatus: 'Launched',
      //   CelestialParam: 'https://t.me/theambiencelife',
      //   premium: 'NO',
      // },
      {
        id: 1.5,
        contentImg: 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_home%2Fnotebook-dde.svg?alt=media&token=13570fcc-4d63-44ca-8f24-0b62a339f5a4&_gl=1*1cdphsb*_ga*MTg5MjU4Mzg0My4xNjk1MTY1MTYz*_ga_CW55HF8NVT*MTY5NzI0Mzg3My4xNC4xLjE2OTcyNDQwNzQuNjAuMC4w',
        imagetwo: null,
        contentImgAlt: 'Daily Diary Express (Aware Members)',
        captionetta: 'Daily Diary Express',
        contentStatus: 'Launched',
        CelestialParam: 'notebook/diary-daily',
        premium: 'YES',
      }
    ]
  },
  {
    id: 2,
    contentImg: XCLUSIVES_IMAGE,
    imagetwo: null,
    contentImgAlt: 'Exclusives',
    captionetta: 'Xclusives',
    contentStatus: 'Unlocked',
    NebulaParam: 'xclusives',
    pageDescrip1: 'Interactive features for redefining and refining life',
    pageDescrip2: 'This is where personal growth accelerates!',
    premium: 'YES',
    subItems: [
      {
        id: 2.1,
        contentImg: 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_home%2Factivities.svg?alt=media&token=9945da26-14b8-46a2-860a-d269591472c9',
        imagetwo: null,
        contentImgAlt: 'Activities',
        captionetta: 'Activities',
        contentStatus: 'Launched',
        CelestialParam: 'activities',
        premium: 'YES',
      },
      {
        id: 2.2,
        contentImg: 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_home%2Fjournal.svg?alt=media&token=083afda4-4c5e-45bc-9738-0b07eab92f8e',
        imagetwo: null,
        contentImgAlt: 'ambience.LIFE Exclusives Notebook',
        captionetta: 'Notebook',
        contentStatus: 'Launched',
        CelestialParam: 'notebook',
        premium: 'YES',
      },
      {
        id: 2.3,
        contentImg: 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_home%2Fcourses.svg?alt=media&token=24fe1919-d372-4bfd-83d4-b8837993b513',
        imagetwo: null,
        contentImgAlt: 'ambience.LIFE Exclusives Courses Corner',
        captionetta: 'Courses Corner',
        contentStatus: 'Launched',
        CelestialParam: 'courses-corner',
        premium: 'YES',
      },
      {
        id: 2.4,
        contentImg: TELEGRAM_IMAGE,
        imagetwo: null,
        contentImgAlt: 'ambience.LIFE Private Telegram Group',
        captionetta: 'Telegram Group',
        contentStatus: 'Launched',
        CelestialParam: 'https://t.me/+7YYN3CQbuToxOTkx',
        premium: 'YES',
      }
    ]
  },
  {
    id: 3,
    contentImg: LIFEDESIGN_IMAGE,
    imagetwo: null,
    contentImgAlt: 'Life Design',
    captionetta: 'Life Design',
    contentStatus: 'Unlocked',
    NebulaParam: 'lifedesign',
    pageDescrip1: 'Premium features offering an interactive, personalized, and guided experience',
    pageDescrip2: 'We expect a first-phase launch of features Q2 2024',
    premium: 'YES',
    subItems: [
      {
        id: 3.1,
        contentImg: 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_home%2Fxclusives-courses.svg?alt=media&token=d7706ce9-df92-4420-9a7e-1aeeade1af43',
        imagetwo: null,
        contentImgAlt: 'Courses Corner Plus',
        captionetta: 'Courses Corner Plus',
        contentStatus: 'Not Launched',
        CelestialParam: '',
        premium: 'YES',
      },
      {
        id: 3.2,
        contentImg: 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_home%2F1on1-lifedesign.svg?alt=media&token=a7c42b81-9af8-4d56-bd1a-cbecd6171e4a',
        imagetwo: null,
        contentImgAlt: '1on1 Life Design',
        captionetta: '1on1 Life Design',
        contentStatus: 'Not Launched',
        CelestialParam: '',
        premium: 'YES',
      },
      {
        id: 3.3,
        contentImg: 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_home%2Fgroup-lifedesign.svg?alt=media&token=d2992899-ce01-47b0-bbbd-3c4d15fc724f',
        imagetwo: null,
        contentImgAlt: 'Group Life Design',
        captionetta: 'Group Life Design',
        contentStatus: 'Not Launched',
        CelestialParam: '',
        premium: 'YES',
      },
      {
        id: 3.4,
        contentImg: 'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_home%2Fgroup-lifedesign.svg?alt=media&token=d2992899-ce01-47b0-bbbd-3c4d15fc724f',
        imagetwo: null,
        contentImgAlt: 'Destiny Design Dialogue',
        captionetta: 'Destiny Design Dialogue',
        contentStatus: 'Not Launched',
        CelestialParam: '',
        premium: 'YES',
      },
    ]
  },
]

function NebulaPage({ params }: PageProps) {
  // Unwrap the promise using React.use()
  const { NebulaParam } = React.use(params)

  const [user, setUser] = useState<any>(null)
  const [userSessionToken, setuserSessionToken] = useState<any>(null)
  const [currentChannel, setCurrentChannel] = useState('')

  useEffect(() => {
    const activeSession = JSON.parse(localStorage.getItem('session') || '{}')
    if (activeSession?.loginStatus !== 'Granted' && typeof window !== 'undefined') {
      window.location.href = window.location.origin + '/eh'
    }

    const channelFromSession = activeSession.channel
    setCurrentChannel(channelFromSession || '')

    setUser(activeSession)
    setuserSessionToken(activeSession)
  }, [])

  // Find the correct nebula based on the NebulaParam
  const nebulaMeta = fetchNebulaData.find(
    nebula => nebula.NebulaParam.toLowerCase() === NebulaParam.toLowerCase()
  )

  if (!nebulaMeta) return (<FunctionBeach404 />)

  // Destructure directly from the nebulaMeta
  const { captionetta: pageTitle, pageDescrip1, pageDescrip2 } = nebulaMeta

  return (
    <div className='al_client_page_container'>
      <Header pageTitle={pageTitle} pageDescrip1={pageDescrip1} pageDescrip2={pageDescrip2} />
      <BrickContainer>
        {NebulaParam.toLowerCase() === "xclusives" && (
          <BrickXclusivesIntro id={0} icon={''} name={''} link={''} isUsingIcon={true} />
        )}
        {nebulaMeta.subItems.map(celestial =>
          celestial.id === 1.5 || celestial.id === 2.4 ? (
            <BrickCelestialCustomXTLink
              key={celestial.id}
              icon={celestial}
              userSessionToken={userSessionToken}
              NebulaParam={NebulaParam}
              className={''}
              currentChannel={currentChannel}
            />
          ) : celestial.CelestialParam === 'notebook/diary-daily' ? (
            <BrickCelestialCustom
              key={celestial.id}
              icon={celestial}
              userSessionToken={userSessionToken}
              NebulaParam={NebulaParam}
              className={''}
              currentChannel={currentChannel}
            />
          ) : (
            <BrickCelestial
              key={celestial.id}
              icon={celestial}
              userSessionToken={userSessionToken}
              NebulaParam={NebulaParam}
              className={celestial.contentStatus === 'Launched' ? 'dashboard_brick brick' : ''}
              currentChannel={currentChannel}
            />
          )
        )}
      </BrickContainer>
    </div>
  )
}

export default NebulaPage
