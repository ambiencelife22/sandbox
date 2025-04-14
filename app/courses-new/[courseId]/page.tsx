/* /app/courses-new/[courseId]/page.tsx */

import CourseModules from '../components/CourseModules'

export default async function CoursePage(props: { params: { courseId: string } }) {
    const { courseId } = props.params
    return await CourseModules({ courseId })
  }
  
