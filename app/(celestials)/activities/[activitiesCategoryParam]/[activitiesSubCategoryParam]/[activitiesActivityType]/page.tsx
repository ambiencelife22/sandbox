// [activityType]/page.tsx
'use client'
import React, { useEffect, useState } from 'react'

// @@ Utilities @@
// import Function404 from '@/pages/activity404'

// @@ Import external ux functions @@
// import { ActivitiesLoadingAnimation } from '@/components/ui/loading-animation'

// @@ Import Activity Types @@
import Seeds from '../../../../../activities/activity-seeds/page'
import Typer from '../../../../../activities/activity-typer/page'
import Cards from '../../../../../activities/activity-cards/page'
import Scramble from '../../../../../activities/activity-scramble/page'
import FunctionBeach404 from '../../../../../../pages/beach404'

enum ActivityTypes {
  Seeds = 'Seeds',
  Typer = 'Typer',
  Cards = 'Cards',
  Scramble = 'Scramble',
}

const ActivityTypePassthroughPage: React.FC = () => {
  const [activityType, setActivityType] = useState<string | null>(null)
  

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathSegments = window.location.pathname.split('/')
      const activityTypeSegment = pathSegments[pathSegments.length - 2]
      setActivityType(activityTypeSegment)
    }
  }, [])

  switch (activityType) {
    case ActivityTypes.Seeds:
      return <Seeds />
      case ActivityTypes.Typer:
      return <Typer />
    case ActivityTypes.Cards:
      return <Cards />
    case ActivityTypes.Scramble:
      return <Scramble />
    default:
      return <FunctionBeach404 />
  }
}

export default ActivityTypePassthroughPage