import CourseReview from './components/CourseReview'
import clarityCanvas from '@/app/courses-new/data/ClarityCanvas.json'

export default function Page({ params }: { params: { courseId: string } }) {
  const modules = clarityCanvas.modules.map((m) => ({
    id: m.id,
    title: m.title,
    submodules: m.submodules.map((s: any) => ({ id: s.id, title: s.title })),
  }))

  return <CourseReview courseId={params.courseId} modules={modules} />
}
