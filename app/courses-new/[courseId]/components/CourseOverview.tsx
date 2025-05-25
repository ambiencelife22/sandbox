/* [courseId]/CourseOverview.tsx */

import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import '../../../../styles/globals.css'

interface CourseOverviewProps {
  courseId: string;
}

export default async function CourseOverview({
  courseId,
}: CourseOverviewProps) {
  const normalizedId = courseId
    .replace(/-([a-z])/g, (_, char) => char.toUpperCase())
    .replace(/^./, (char) => char.toUpperCase());

  try {
    const filePath = path.join(
      process.cwd(),
      "app/courses-new/data",
      `${normalizedId}.json`
    );

    const fileContents = await fs.readFile(filePath, "utf-8");
    const courseData = JSON.parse(fileContents);
    const modules = courseData.modules || [];
    const activeModules = modules.filter((m: any) => m.active !== "no");
    const activeModule = activeModules[0]?.id || "";

    return (
      // <div className='p-6 max-w-5xl mx-auto'>
      //   <div className='flex justify-between items-center mb-4'>
      //     <h1 className='text-3xl font-bold capitalize'>
      //       {courseId.replace(/-/g, ' ')} Course
      //     </h1>

      //     <Link
      //       href={`/courses-new/${courseId}/review`}
      //       className='print:hidden'
      //     >
      //       <span className='inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded'>
      //         📘 Review Full Course
      //       </span>
      //     </Link>
      //   </div>

      <section className="max-w-6xl mx-auto px-8 py-12 bg-white border border-gray-200 rounded-3xl shadow-lg overflow-hidden">

      {/* // <section className="relative max-w-6xl px-6 pt-6 pb-10 min-h-[350px] border border-gray-300 rounded-tl-[4rem] rounded-br-[4rem] shadow-md flex flex-col "> */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Title + Tagline */}
          <div className="space-y-2">
            <h1 className="text-5xl font-extrabold tracking-tight leading-tight text-gray-900">
              {courseId.replace(/-/g, " ")} Course
            </h1>
          </div>

          {/* CTA Button */}
          <Link
            href={`/courses-new/${courseId}/review`}
            className="print:hidden"
          >
            <button
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full shadow-md 
             bg-blue-600 hover:bg-blue-700 
            text-white
             transition"
            >
              📘 Review Full Course
            </button>
          </Link>
        </div>

        <Tabs defaultValue={activeModule}>
          <TabsList className="flex overflow-x-auto whitespace-nowrap space-x-2 no-scrollbar">
            {activeModules.map((module: any) => (
              <TabsTrigger key={module.id} value={module.id}>
                {module.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* {activeModules.map((module: any) => (
            <TabsContent key={module.id} value={module.id}>
              <Card className="mt-4">
                <CardContent className="space-y-4">
                  <h2 className="text-xl font-semibold">{module.title}</h2>
                  <p>{module.description}</p>
                  <Link
                    className="inline-block mt-2 text-blue-600 underline"
                    href={`/courses-new/${courseId}/module/${module.id}`}
                  >
                    Start Module →
                  </Link>
                </CardContent>
              </Card>
            </TabsContent>
          ))} */}

          {/* <TabsContent key={module.id} value={module.id}>
  <div className="mt-6">
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 transition hover:shadow-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-800">{module.title}</h2>
      <p className="text-gray-600 mt-2 leading-relaxed">
        asd
      </p>
      <Link
        href={`/courses-new/${courseId}/module/${module.id}`}
        className="inline-block mt-4 text-indigo-600 font-semibold hover:text-indigo-800 underline transition-colors duration-200"
      >
        hehe
      </Link>
    </div>
  </div>
</TabsContent> */}

          <TabsContent key={module.id} value={module.id}>
            <div className="mt-10">
              <div className="relative overflow-hidden rounded-3xl p-8 shadow-2xl border border-white/20 bg-white/5 backdrop-blur-lg transition-transform duration-300 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500 opacity-20 blur-3xl animate-pulse z-0" />
                <div className="relative z-10">
                  <h2 className="text-4xl font-extrabold text-white drop-shadow-md">
                    {module.title}
                  </h2>
                  <p className="mt-4 text-lg text-gray-200">asd</p>
                  <Link
                    href={`/courses-new/${courseId}/module/${module.id}`}
                    className="inline-block mt-6 bg-gradient-to-r from-pink-500 to-violet-600 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-pink-500/50 transition-all duration-300"
                  >
                    hehe
                  </Link>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        {/* </div> */}
      </section>
    );
  } catch (error) {
    console.error("CourseOverview load error:", error);
    return <div className="text-red-600">Error loading course data</div>;
  }
}
