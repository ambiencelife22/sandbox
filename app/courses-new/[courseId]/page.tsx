/* [courseId]/page.tsx */
import '@/app/app.css'
import CourseOverview from './components/CourseOverview'

export default async function Page(props: any) {
  const { courseId } = props.params

  return await CourseOverview({ courseId })
}
