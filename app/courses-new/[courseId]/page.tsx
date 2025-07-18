import CourseOverview from "./components/CourseOverview";

interface Props {
  params: { courseId: string };
  searchParams: { tab?: string };
}

export default function Page({ params, searchParams }: Props) {
  return (
    <CourseOverview courseId={params.courseId} tab={searchParams.tab || ""} />
  );
}
