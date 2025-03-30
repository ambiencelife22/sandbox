'use client'
import React, { FunctionComponent, useState, useEffect } from 'react'

// @@ Import external functions @@
import BrickActivitySubCategory from '../components/_BrickActivitySubCategory'
import NavBar from '../../../(a-growers)/components/NavBarActivities'
import Footer from '../../../(a-growers)/components/FooterGrowers'

// @@ Import external ux functions @@
import { ActivitiesLoadingAnimation } from '../../../../components/ui/loading-animation'

// @@ Import Progress Indicator
import ACTIVITIESProgressBar from '../components/_Activities_ProgressBar'

import {
    ThemeProgressData,
    calculateTotalThemeProgress,
    calculateTotalActivityThemeTokens,
} from '../../../../utils/(calcs)/_ActivityProgressCalculations'

// Update the interface so that `params` is a promise returning an object with `activitiesCategoryParam`
interface PageProps {
    params: Promise<{
        activitiesCategoryParam: string
    }>
}

const fetchAllData = async () => {
    // const API_URL = `/api/constant-data/series/orbits/GetAllAppCategories`

    const API_URL = `https://ambiencelife-api-us.com/api/v1/data/categories/all`
    const response = await fetch(API_URL)
    const data = await response.json()
    return data
}

interface SubCategory {
    id: number
    name: string
    alt: string
    image: string
    imagetwo?: string
    imageDescription: string
    level: string
    status: string
    handle: string
    premium: string
}

interface CategoryMeta {
    id: number
    token: string
    name: string
    alt: string
    image: string
    imageDescription: string
    level: string
    premium: string
    status: string
    handle: string
    subCategories: SubCategory[]
}

interface CategoryData {
    meta: CategoryMeta[]
}

const CategoryPage: FunctionComponent<PageProps> = ({ params }) => {
    // Unwrap the params promise to access activitiesCategoryParam
    const { activitiesCategoryParam } = React.use(params)

    const [categoryMeta, setCategoryMeta] = useState<CategoryData | null>(null)
    const [progressData, setProgressData] = useState<ThemeProgressData[]>([])
    const [tokens, setTokens] = useState<number>(0)

    // currentProgress is found by matching the current category name to the progress data
    const currentProgress =
        categoryMeta &&
        progressData.find(
            progress =>
                progress.xtheme.toLowerCase() === categoryMeta.meta[0].name.toLowerCase()
        )

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const allData = await fetchAllData()

            // Filter data based on activitiesCategoryParam (case-insensitive)
            const filteredData = allData.meta.filter(
                (category: any) =>
                    category.name.toLowerCase() === activitiesCategoryParam.toLowerCase()
            )

            setCategoryMeta({ meta: filteredData })

            // Calculate progress data from the current progress calculation helper
            const progress = calculateTotalThemeProgress()
            setProgressData(progress)
        }
        fetchData()

        const timeoutId = setTimeout(() => {
            setIsLoading(false)
        }, 2200)

        return () => clearTimeout(timeoutId)
    }, [activitiesCategoryParam])

    if (!categoryMeta) return null

    if (isLoading) {
        return (
            <div className="text-[Plus Jakarta Sans] flex items-center justify-center h-screen">
                <div className="al_home">
                    <div className="al_category_container flex items-center justify-center h-screen">
                        <ActivitiesLoadingAnimation />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="text-[Plus Jakarta Sans]">
            <NavBar />
            <div className="al_home py-8 text-[Plus Jakarta Sans] pb-[121px]">
                <ACTIVITIESProgressBar progressPercentage={currentProgress?.progressPercentage || 0} />
                <div className="al_subcategory_container">
                    <div className="mt-[7rem] al_page_title max-w-[1280px] m-auto mb-0 pl-[20px] lg:flex md:block justify-between">
                        <h1 className="text-3xl font-bold text-left mb-2 text-gray-100 relative">
                            {categoryMeta.meta[0].name}
                        </h1>
                    </div>
                    <div className="al_icon_grid grid grid-cols-2 md:grid-cols-3 gap-6 py-4 px-4 rounded-xl">
                        {categoryMeta.meta.flatMap((category: any, categoryIndex: number) =>
                            category.subCategories.slice(0, 3).map((subCategory: any, subCategoryIndex: number) => {
                                // Calculate tokens for this theme
                                const themeTokens = calculateTotalActivityThemeTokens(subCategory.name, progressData)

                                return (
                                    <div key={subCategory.id}>
                                        <BrickActivitySubCategory
                                            id={subCategory.id}
                                            icon={subCategory}
                                            animateDuration={0.5}
                                            activityTheme={categoryMeta.meta[0].name}
                                            parentCategory={activitiesCategoryParam}
                                            calculateTotalThemeProgress={calculateTotalThemeProgress}
                                            themeTokens={themeTokens}
                                        />
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CategoryPage
