'use client'
import React, { FunctionComponent, Fragment, useState, useEffect, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import { fetchFilterCategoryData } from '@/utils/(hooks-data)/orbits/fetchAllAppFilteredCategories'

// @@ Import external structure functions @@
import NavBar from '@/app/(a-growers)/components/NavBarActivities'
import Footer from '@/app/(a-growers)/components/FooterGrowers'
import BrickActivityType from '../../components/_BrickActivityType'
import ACTIVITIESProgressBar from '@/app/(celestials)/activities/components/_Activities_ProgressBar'

// @@ Import external ux functions @@
import { ActivitiesLoadingAnimation } from '@/components/ui/loading-animation'

import {
  ActivityTypeProgressData,
  ThemeProgressData,
  calcActivityTypeProgressPercentage,
  calculateActivityTokens,
  calculateTotalThemeProgress,
  getActivityData
} from '@/utils/(calcs)/_ActivityProgressCalculations'

// @@ Import child functions @@
import ActivityIntroContent from '@/app/(celestials)/activities/components/ActivityIntro'
import { motion } from 'framer-motion'

interface ActivitySubCategoryPageProps {
  params: Promise<{
    activitiesCategoryParam: string
    activitiesSubCategoryParam: string
    activityType: any
  }>
}

interface IntroPopUpProps {
  activityTypes: { name: string }[]
  modalMeta: {
    modalTitle: string
    modalDescription?: string
    modalDescription2?: string
    introLink?: string
    buttonLabel: string
  }
  resetModal: () => void
  Timer: number
  sessionType: SubCategoryMetaType
  sessionTheme: string
}

interface ActivityType {
  id: number
  backgroundImage: string
  link: string
  text: string
  name: string
  miniDescrip: string
  introLink: string
  unlocked: boolean
}

type SubCategoryMetaType = {
  meta: {
    [key: string]: any
  }[]
}

const ActivitySubCategoryPage: FunctionComponent<ActivitySubCategoryPageProps> = ({ params }) => {
  // Unwrap the route parameters using React.use()
  const { activitiesCategoryParam, activitiesSubCategoryParam, activityType } = React.use(params)

  // Set initial activityTheme from the unwrapped param
  const [activityTheme, setActivityTheme] = useState(activitiesSubCategoryParam)

  const [subCategoryMeta, setSubCategoryMeta] = useState<SubCategoryMetaType | null>(null)
  const [userActivityProgress, setUserActivityProgress] = useState<ActivityTypeProgressData>({
    seeds: 0,
    typer: 0,
    cards: 0,
    scramble: 0,
  })

  const totalUserActivityProgress = Object.values(userActivityProgress).reduce((a, b) => a + b, 0)
  const progressPercentage = totalUserActivityProgress / 4

  const [showModal, setShowModal] = useState(false)
  const toggleModal = (activityType: string) => {
    setSelectedActivityType(activityType)
    setShowModal(!showModal)
  }
  const [modalMeta, setModalMeta] = useState({
    modalTitle: '',
    modalDescription2: '',
    buttonLabel: '',
  })
  const [openModal, setOpenModal] = useState(false)
  const [value, setvalue] = useState(false)
  const [buttonId, setbuttonId] = useState('')
  const [buttonTextId, setbuttonTextId] = useState('')
  const [timer, setTimer] = useState(2)
  const selectRef = useRef<HTMLSelectElement>(null)

  const activityUnlockTokens = calculateActivityTokens(activityTheme)

  const activityTypes: ActivityType[] = [
    {
      id: 1,
      backgroundImage:
        'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_activities%2Factivity-seeds.svg?alt=media&token=661ee0ac-0763-4cd2-a878-ceea3ba4c327',
      link: `/(beacons)/activities/activity-seeds`,
      text: `SEEDS`,
      name: `Seeds`,
      miniDescrip: `Coming Soon`,
      introLink: `/activities/intro-activity-intros`,
      unlocked: true,
    },
    {
      id: 2,
      backgroundImage:
        'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_activities%2Factivity-typer.svg?alt=media&token=5ac0dfd1-3264-4976-a392-5ecaaf82b5ad',
      link: `/typer`,
      text: `TYPER`,
      name: `Typer`,
      miniDescrip: `Coming Soon`,
      introLink: `/activities/intro-activity-intros`,
      unlocked: activityUnlockTokens.includes('typer'),
    },
    {
      id: 3,
      backgroundImage:
        'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_activities%2Factivity-cards.svg?alt=media&token=63e01c8b-3ada-4b2c-8084-5509ca68ee56',
      link: `/cards`,
      text: `CARDS`,
      name: `Cards`,
      miniDescrip: `Coming Soon`,
      introLink: `/activities/intro-activity-intros`,
      unlocked: activityUnlockTokens.includes('cards'),
    },
    {
      id: 4,
      backgroundImage:
        'https://firebasestorage.googleapis.com/v0/b/ambiencelife.appspot.com/o/images%2Fimages_global%2Fimages_activities%2Factivity-scramble.svg?alt=media&token=2ff75bc9-73d7-4390-9ae1-52aa9110381f',
      link: `/scramble`,
      text: `SCRAMBLE`,
      name: `Scramble`,
      miniDescrip: `Coming Soon`,
      introLink: `/activities/intro-activity-intros`,
      unlocked: activityUnlockTokens.includes('scramble'),
    },
  ]

  const [selectedActivityType, setSelectedActivityType] = useState(activityTypes[0].name)
  const [isLoading, setIsLoading] = useState(true)

  const modals = [
    {
      modalTitle:
        `Learn more about ${activityTheme.charAt(0).toUpperCase() + activityTheme.slice(1)}`,
      modalDescription: '',
      modalDescription2: 'Coming Soon',
      introLink: '',
      buttonLabel: 'Activity Launch',
    },
    {
      modalTitle: `Welcome to ` + selectedActivityType,
      modalDescription: '',
      modalDescription2:
        selectedActivityType !== null && typeof selectedActivityType === 'object'
          ? (selectedActivityType as ActivityType).miniDescrip
          : 'Visit Our Activity Intros\n(Opens New Window)',
      introLink:
        selectedActivityType !== null && typeof selectedActivityType === 'object'
          ? (selectedActivityType as ActivityType).introLink
          : '/activities/intro-activity-intros',
      buttonLabel: 'Activity Launch',
    },
    {
      modalTitle: 'Set Activity Duration',
      modalDescription: (
        <>
          <select
            className='minimal'
            id='SetTimer'
            defaultValue={2}
            ref={selectRef}
            onChange={setLocalStorageForTimer}
          >
            <option value={2}>2 Minutes</option>
            <option value={4}>4 Minutes</option>
            <option value={11}>11 Minutes</option>
            <option value={22}>22 Minutes</option>
          </select>
        </>
      ),
      modalDescription2: '',
      buttonLabel: 'Activity',
    },
  ]

  const userTotalPointsThemes = JSON.parse(localStorage.getItem('activity:progress') || '{}')

  const [progressData, setProgressData] = useState<ThemeProgressData[]>([])
  const currentProgress = progressData.find(
    (progress: { xtheme: string }) =>
      progress.xtheme.toLowerCase() === activityTheme.toLowerCase()
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchFilterCategoryData(activitiesSubCategoryParam)
        setSubCategoryMeta(data)

        // Fetch user progress data and set to state
        const fetchedUserProgressData = getActivityData(activityTheme)
        setUserActivityProgress(fetchedUserProgressData)
      } catch (error) {
        console.error(`Error fetching data: ${(error as Error).message}`)
      }
    }

    fetchData()

    const timeoutId = setTimeout(() => {
      setIsLoading(false)
    }, 2200)

    // Re-set activity theme every time the page loads
    localStorage.setItem('x:theme', activitiesSubCategoryParam)

    return () => clearTimeout(timeoutId)
  }, [activitiesSubCategoryParam, activityTheme])

  useEffect(() => {
    const handleStorageChange = () => {
      const storedTimer = localStorage.getItem('timer')
        ? parseInt(localStorage.getItem('timer')!)
        : 2
      setTimer(storedTimer)
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  function setLocalStorageForTimer() {
    const timerInput = selectRef.current?.value
    localStorage.setItem('timer', timerInput as string)
    setTimer(parseInt(timerInput as any))
  }

  function setOpen(value: boolean, buttonTextId: string): void {
    if (openModal) {
      setOpenModal(false)
      setbuttonId(buttonTextId)
    }
    if (!openModal) {
      setOpenModal(true)
    }
    setbuttonId(buttonTextId)

    if (buttonTextId === 'ThemeBtn') {
      setModalMeta(modals[0])
    }
    if (buttonTextId === 'SkillBtn') {
      setModalMeta(modals[1])
    }
    if (buttonTextId === 'TimerInfoBtn') {
      setModalMeta(modals[2])
    }
  }

  function resetModal() {
    openModal ? setOpenModal(false) : setOpenModal(true)
  }

  if (!subCategoryMeta) return null

  if (isLoading)
    return (
      <div className='text-[Plus Jakarta Sans] flex items-center justify-center h-screen'>
        <div className='al_home'>
          <div className='al_category_container flex items-center justify-center h-screen'>
            <ActivitiesLoadingAnimation />
          </div>
        </div>
      </div>
    )

  const progressPercentages = calcActivityTypeProgressPercentage(userActivityProgress)
  const themeProgressData = calculateTotalThemeProgress()
  const currentThemeProgress = themeProgressData.find(
    (progress: ThemeProgressData) =>
      progress.xtheme.toLowerCase() === activityTheme.toLowerCase()
  )

  return (
    <div className='text-[Plus Jakarta Sans]'>
      <NavBar />
      <div className='al_home py-8 text-[Plus Jakarta Sans] pb-[121px]'>
        <div className='activity_subcategory_container'>
          <div className='mt-[4rem] m-auto w-full flex justify-between items-center max-w-[1100px]'>
            <h1 className='text-3xl font-bold text-left -mb-2 pl-[11px] text-gray-100'>
              {activityTheme}
            </h1>
            <ACTIVITIESProgressBar
              className='activity_theme_page_progressbar'
              progressPercentage={currentThemeProgress?.progressPercentage || 0}
              style={{ position: 'relative', maxWidth: '440px', height: '16px', marginBottom: '-44px' }}
            />
          </div>
          <div className='activity_icon_grid max-w-[1100px] grid grid-cols-2 md:grid-cols-3 gap-6 py-4 px-2 rounded-xl mx-auto w-full'>
            {activityTypes.map((activityItem) => {
              return (
                <div key={activityItem.id}>
                  <BrickActivityType
                    {...activityItem}
                    animateDuration={0.5}
                    showModal={() => toggleModal(activityItem.name)}
                    activityTheme={activityTheme}
                    seedsProgressPercentage={progressPercentages.seeds}
                    typerProgressPercentage={progressPercentages.typer}
                    cardsProgressPercentage={progressPercentages.cards}
                    scrambleProgressPercentage={progressPercentages.scramble}
                    activityTokens={activityUnlockTokens}
                  />
                </div>
              )
            })}
            {showModal && (
              <ActivityIntroContent
                activityType={selectedActivityType}
                activityTheme={activityTheme}
                setOpen={setOpen}
                onClose={toggleModal}
                initialTimer={timer}
              />
            )}
          </div>
        </div>
      </div>
      {openModal ? (
        <IntroPopUp
          Timer={timer}
          resetModal={() => resetModal()}
          sessionType={subCategoryMeta}
          sessionTheme={activityTheme}
          modalMeta={modalMeta}
          activityTypes={activityTypes}
        />
      ) : (
        <></>
      )}
      <Footer />
    </div>
  )
}

export default ActivitySubCategoryPage

function IntroPopUp({ activityTypes, modalMeta, resetModal, Timer, ...props }: IntroPopUpProps) {
  const [modelVisible, setModelVisible] = useState(true)

  function setOpen(value: boolean): void {
    setModelVisible(false)
    resetModal()
  }

  return (
    <Transition.Root show={modelVisible} as={Fragment}>
      <Dialog as='div' className='relative hello_modal' onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='settings_modal_overlay fixed inset-0 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Dialog.Panel className='settings_modal xlg_modal relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6'>
                  <div>
                    <div className='mt-3 text-center sm:mt-5'>
                      <h2 className='text-sky-700 text-2xl text-[Plus Jakarta Sans]'>{modalMeta.modalTitle}!</h2>
                      <div className='modal_legal_link'>
                        <p>
                          <span>
                            {modalMeta.introLink ? (
                              <a
                                href={modalMeta.introLink}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='hover:underline hover:text-[#7FDEFF]'
                              >
                                {modalMeta.modalDescription2?.split('\n').map((line, index) => (
                                  <Fragment key={index}>
                                    {line}
                                    <br />
                                  </Fragment>
                                ))}
                              </a>
                            ) : (
                              <span>{modalMeta.modalDescription2}</span>
                            )}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='mt-5 sm:mt-6 settings_modal_footer with_border'>
                    <button
                      type='button'
                      className='bg-[#81188f] inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm'
                      onClick={() => {
                        setOpen(false)
                        document.querySelector('#dynamic_activity_time_setter')!.innerHTML = `${Timer}:00`
                      }}
                    >
                      Back To {modalMeta.buttonLabel}
                    </button>
                  </div>
                </Dialog.Panel>
              </motion.div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
