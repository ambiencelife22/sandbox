'use client'
import React, { useState, useEffect } from 'react'

function ACTIVITIES_PointsIndicator(props) {
    const [CCPoints, setCCPoints] = useState(0)
    const [UserCategoriesUnlocked, setUserCategoriesUnlocked] = useState(Object)
    useEffect(() => {
        if (localStorage.getItem('points')) {
            let propertyKey = props.categoryKey
            let pointsMeta = JSON.parse(localStorage.getItem('points'))
            setCCPoints(pointsMeta.meta[0].al_Points)

            let level = Math.floor(pointsMeta.meta[0].al_Points / 121)
            level = level > 22 ? 22 : level

            setCCPoints(level)
        }


        let userPointsMeta = JSON.parse(localStorage.getItem('points'))
        let pointsCategories = userPointsMeta['meta'][0]

        setUserCategoriesUnlocked(pointsCategories.Categories_Points)

    }, [])

    let filtered = []
    for (let i = 0; i <= UserCategoriesUnlocked.length; i++) {
    }

    return (
        <> <button className='dynamic_points_pill medication'> <span className='inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#81038f] shadow-md'>
            {CCPoints ? (<span className='text-xl font-medium leading-none p_color dynamic_points'>Level {CCPoints > 0 ? CCPoints : 0}</span>) : <></>}
                </span>
            </button></>
    )
}

export default ACTIVITIES_PointsIndicator