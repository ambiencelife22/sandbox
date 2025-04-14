/* [courseId]/page.tsx */
import CourseOverview from './components/CourseOverview'

export default function Page({ params }: { params: { courseId: string } }) {
  return <CourseOverview courseId={params.courseId} />
}
