/* activities/page.tsx */
'use client'
import React, { FunctionComponent, useEffect, useState } from 'react'

// @@ Import utility functions @@
import useLocalStorage from '../../../utils/useLocalStorage'

// @@ Import external structure functions @@
// import NavBar from '../../(a-growers)/components/NavBarActivities'
// import Footer from '../../(a-growers)/components/FooterGrowers'
import Brick from '../../(celestials)/activities/components/_BrickActivityCategory'
import Header from '../../(a-growers)/eh/header'

// @@ Import external ux functions @@
import { ActivitiesLoadingAnimation } from '../../../components/ui/loading-animation'
import BrickActivityIntro from '../../(celestials)/activities/components/_BrickActivityIntro'
import BrickActivitiesIntros from '../../(celestials)/activities/components/_BrickActivityMore'
import BrickActivitySubConcious from '../../(celestials)/activities/components/_BrickActivityCategorySubconcious'
import { getUserActivityThemePoints } from '../../(libs)/helpers'

interface CategoryData {
  id: string
  name: string
  SubCategoryParam: string
  activityType: string
}

interface Categories {
  meta: CategoryData[]
}

// @ts-ignore
const ActivitiesHome: FunctionComponent<PageProps> = (props) => {

  const [sessionID, setSessionID] = useState<number | null>(Date.now())
  const [CategoryParam, setCategoryParam] = useState<string | null>(null)
  const [SubCategoryParam, setSubCategoryParam] = useState<string | null>(null)
  const [activityType, setActivityType] = useState<string | null>(null)

  const defaultCategory = 'Core'

  const [categories, setCategories] = useState<Categories | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize activityData on page load

  // Fetching data and set categories
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('/api/constant-data/series/orbits/GetAllAppCategories')
  //     const data = await response.json()
  //     setCategories(data)
  //   }
  //   fetchData()
  // }, [])

  // @@ TEMPORARY @@

  // Fetching data and set categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://ambiencelife-api-us.com/api/v1/data/categories/all")
        // const response = await fetch('/api/constant-data/series/orbits/GetAllAppCategories')
        const allData = await response.json()

        // Filter the data to only include the category named "Core"
        const coreCategory = allData.meta.filter((category: CategoryData) => category.name === 'Core')
        const coreData = { meta: coreCategory }
        setCategories(coreData)

        // Assuming there's only one 'Core' category:
        if (coreCategory.length > 0) {
          setCategoryParam('Core')
          setSubCategoryParam(coreCategory[0].SubCategoryParam || 'waiting')
          setActivityType(coreCategory[0].activityType || 'waiting')
        }

      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()

    const timeoutId = setTimeout(() => {
      setIsLoading(false)
    }, 2200)

    return () => clearTimeout(timeoutId)
  }, [])

  if (isLoading) {
    return (
      <div className=' text-[Plus Jakarta Sans] flex items-center justify-center h-screen'>
        <div className='al_home'>
          <div className='al_category_container flex items-center justify-center h-screen'>
            <ActivitiesLoadingAnimation />
          </div>
        </div>
      </div>
    )
  }

  function handleCategoryClick(category: CategoryData) {
    setSessionID(Date.now())
    setCategoryParam(category.name)
    setSubCategoryParam(category.SubCategoryParam)
    setActivityType(category.activityType)
  }


  return (
    <div className=' text-[Plus Jakarta Sans]'>
      {/* <NavBar /> */}
      <div className="al_home py-8 text-[Plus Jakarta Sans] pb-[121px]">
        <div className='header_container'>
          <Header pageTitle={'Activities'} pageDescrip1={'Gamified, interactive, non-personalized features that utilize the power of words to reinforce a self-empowering mindset'} pageDescrip2={''} />
        </div>
        <div className='al_category_container'>
          <div className="al_icon_grid grid grid-cols-2 md:grid-cols-3 gap-6 py-4 px-4 rounded-xl">
            <BrickActivityIntro id={0} icon={''} name={''} link={''} isUsingIcon={true} />
            <BrickActivitiesIntros id={0} icon={''} name={''} link={''} isUsingIcon={true} />
            {categories?.meta.map((category: any) => (
              <Brick
                key={category.id}
                icon={category}
                categoriesMeta={categories}
                categoryID={category.id}
                onClick={() => handleCategoryClick(category)}
              />
            ))}
            <BrickActivitySubConcious id={0} icon={''} name={''} link={''} isUsingIcon={true} />
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default ActivitiesHome
