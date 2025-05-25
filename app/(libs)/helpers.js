'use client'
import React, { useEffect, useState } from 'react'

import { API_URL, API_URL2 } from '../pages/api/general/TEMPhelpersAPI'

export const handleLogout = () => {
    let domain = (new URL(window.location.href))
    localStorage.removeItem('session')
    localStorage.removeItem('points')
    localStorage.removeItem('seenit:v1')
    localStorage.removeItem('seenit:des:v1')
    localStorage.removeItem('level:cc:v1')
    localStorage.removeItem('activity:progress')
    if (typeof window !== 'undefined') {
        window.location.href = window.location.origin + '/eh'
    }
}

export const updateUserPoints = (points) => {
    const [Points, setPoints] = useState(points)
    useEffect(() => {
        setPoints(points)
    }, [points])
    return <>{Points}</>
}

export const getUserPoints = async (uuid) => {
    // init points
    const API_TOKEN = uuid
    const setupPoints = await fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({ API_TOKEN: API_TOKEN }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const setup_data = await setupPoints.json()
    if (setup_data['meta'] != null) {
        localStorage.setItem('points', JSON.stringify(setup_data))
        let userPoints = JSON.parse(localStorage.getItem('points'))
        // getUserActivityThemePoints(uuid)
        return userPoints['meta'][0]
    }
}

export const getUserActivityThemePoints = async (uuid) => {
    // init points
    const API_TOKEN = uuid
    const fetchTotalPointsPerTheme = await fetch(API_URL2, {
        method: 'POST',
        body: JSON.stringify({ API_TOKEN: API_TOKEN }),
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const theme_points_data = await fetchTotalPointsPerTheme.json()


    if (theme_points_data['meta'] != null) {
        // localStorage.setItem('session', JSON.stringify(data))
        localStorage.setItem('activity:progress', JSON.stringify(theme_points_data))
        let userThemeTotalPoints = JSON.parse(localStorage.getItem('activity:progress'))
        return userThemeTotalPoints['meta'][0]
    }
}

/* 

NEED TO ADD THESE CRITERIA TO THE PRODUCTS TABLE

*/

export const tiersLifetime = [
    {
        membershipName: 'GLOW by ambience.LIFE',
        id: 'tier-glow-lifetime',
        href: '/upgrade/memberships/subscriptions-lt/GlowLifetimeOTP/checkout',
        handler: 'GlowLifetimeOTP',
        priceLifetime: '$22',
        notPriceLifetime: '$199',
        payTimePeriod: 'Pay Once For LIFETIME access',
        description: 'Powerful, interactive features for redefining and refining life',
        features: [
            '4 Fully Private & Secure Journaling Features',
            '4 Interactive Self-Empowering Phrase Games',
            'Human Harmony — Our inagural life-improvement course',
            'Bonus Content Fully Unlocked',
            'Access to our Member Support Center'
        ],
    }
]
export const tiersLifetimeFREE = [
    {
        membershipName: 'GLOW by ambience.LIFE',
        id: 'tier-glow-lifetime-free',
        href: '/upgrade/memberships/subscriptions-gf/GlowFree/checkout',
        handler: 'GlowFree',
        priceLifetime: '$0',
        notPriceLifetime: '$199',
        payTimePeriod: 'Free For LIFETIME access',
        description: 'Powerful, interactive features for redefining and refining life',
        features: [
            '4 Fully Private & Secure Journaling Features',
            '4 Interactive Self-Empowering Phrase Games',
            'Human Harmony — Our inagural life-improvement course',
            'Bonus Content Fully Unlocked',
            'Access to our Member Support Center'
        ],
    }
]

export const tiersGlow = [
    {
        membershipName: 'GLOW by ambience.LIFE',
        id: 'tier-glow-annualotp',
        href: '/upgrade/memberships/subscriptions-g/GlowAnnualOTP/checkout',
        handler: 'GlowAnnualOTP',
        priceSubscription: '$22',
        notPriceSubscription: '$99',
        payTimePeriod: 'Pay Once For 1-YEAR Access',
        description: 'Powerful, interactive features for redefining and refining life',
        features: [
            '4 Gamified Self-Empowering Phrase Games',
            'Our Xclusive Notebook Feature',
            'Desire Dreamboard (Coming Soon!)',
            'Bonus Content'
        ],
    },
    {
        membershipName: 'GLOW by ambience.LIFE',
        id: 'tier-glow-lifetimeotp',
        href: '/upgrade/memberships/subscriptions-g/GlowLifetimeOTP/checkout',
        handler: 'GlowLifetimeOTP',
        priceSubscription: '$22',
        notPriceSubscription: '$299',
        payTimePeriod: 'Pay Once For LIFETIME access',
        description: 'Powerful, interactive features for redefining and refining life',
        features: [
            '4 Fully Private & Secure Journaling Features',
            '4 Interactive Self-Empowering Phrase Games',
            'Human Harmony — Our inagural life-improvement course',
            'Bonus Content Fully Unlocked'
        ],
    },
]

export const tiersAware = [
    {
        membershipName: 'Aware by ambience.LIFE',
        id: 'tier-awarelifetimeotp',
        href: '/upgrade/memberships/subscriptions-a/AwareLifetimeOTP/checkout',
        handler: 'AwareLifetimeOTP',
        priceSubscription: '$2',
        notPriceSubscription: '$9',
        payTimePeriod: 'Pay Once For LIFETIME Access',
        description: 'Semi-interactive, non-personalized features available for everyone!',
        features: [
            'Curated content fully unlocked.',
            'Destinations content fully unlocked.',
            'Complimentary access to our Daily Diary Express feature'
        ],
    },

]

export const tierGlowPlus = [
    {
        membershipName: 'Glow+ by ambience.LIFE',
        id: 'tier-glowpluslifetimeotp',
        href: '/upgrade/memberships/subscriptions-g+/GlowPlusLifetimeOTP/checkout',
        handler: 'GlowPlusLifetimeOTP',
        priceSubscription: '$2',
        notPriceSubscription: '$22',
        payTimePeriod: 'Pay Once For LIFETIME Access',
        description: 'Powerful, interactive features for redefining and refining life!',
        features: [
            '4 Fully Private & Secure Journaling Features FULLY UNLOCKED!',
            '4 Interactive Self-Empowering Phrase Games FULLY UNLOCKED!',
            'Bonus Content FULLY UNLOCKED!'
        ],
    },

]

export const FetchTiersBadge = (props) => {
    const theSelectedTiers = props.selectedTier
    let filteredTier

    if (tiersGlow.filter((tier) => tier.handler === theSelectedTiers).length > 0) {
        filteredTier = tiersGlow.filter((tier) => tier.handler === theSelectedTiers)
    }
    if (tiersAware.filter((tier) => tier.handler === theSelectedTiers).length > 0) {
        filteredTier = tiersAware.filter((tier) => tier.handler === theSelectedTiers)
    }
    if (tierGlowPlus.filter((tier) => tier.handler === theSelectedTiers).length > 0) {
        filteredTier = tierGlowPlus.filter((tier) => tier.handler === theSelectedTiers)
    }
    if (tiersLifetimeFREE.filter((tier) => tier.handler === theSelectedTiers).length > 0) {
        filteredTier = tiersLifetimeFREE.filter((tier) => tier.handler === theSelectedTiers)
    }

    // If no matching tier is found, return null or a placeholder
    if (!filteredTier.length) {
        return <div>No matching tier found for {theSelectedTiers}</div>
    }

    return (
        <div className='membership_tier_badge pb-4'>
            <h1 className='font-[prata] p_color mt-2 text-3xl font-bold tracking-tight relative'>{filteredTier[0].membershipName}</h1>
            <p className='p_color'> {filteredTier[0].description}</p>
            <p className='p_color text-2xl text-center font-extrabold pt-2 -mb-4'>{filteredTier[0].priceLifetime} {filteredTier[0].payTimePeriod} <span id='display_full_price'> ({filteredTier[0].priceSubscription})</span></p>
        </div>
    )
}




// beta

