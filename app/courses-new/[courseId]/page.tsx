/* [courseId]/page.tsx */
import CourseOverview from './components/CourseOverview'

export default async function Page(props: any) {
  const { courseId } = props.params

  return await CourseOverview({ courseId })
}
