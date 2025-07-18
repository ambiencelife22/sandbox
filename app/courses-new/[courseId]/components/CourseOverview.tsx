// app/courses-new/[courseId]/CourseOverview.tsx

import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import "../../../../styles/globals.css";
import GradientBackground from "./GradientBackground"; // Adjust import path

interface CourseOverviewProps {
  courseId: string;
  tab: string;
}

export default async function CourseOverview({
  courseId,
  tab,
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

    const currentModule = activeModules.find((m: any) => m.id === tab) ||
      activeModules[0] || {
        title: "",
        description: "",
        id: "",
      };

    return (
      <div className="relative min-h-screen w-full bg-black text-white font-sans">
        <GradientBackground />

        <div className="relative z-40 max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <h1 className="text-4xl font-extrabold tracking-tight capitalize">
            {courseId.replace(/-/g, " ")} Course
          </h1>
          <Link
            href={`/courses-new/${courseId}/review`}
            className="print:hidden"
          >
            <button
              className="relative inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full shadow-md text-white  border-transparent bg-transparent overflow-hidden group transition-all duration-300 ease-in-out"
              style={{
                borderImage:
                  "linear-gradient(44deg, #520e63, #651279, #b221d2) 1",
                borderImageSlice: 1,
              }}
            >
              <span className="absolute inset-0 bg-[linear-gradient(44deg,_#520e63,_#651279,_#b221d2)] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out z-0" />
              <span className="relative z-10">📘 Review Full Course</span>
            </button>
          </Link>
        </div>

        <div className="relative z-40 flex items-center justify-center py-20">
          <div
            className="relative w-[800px] h-[800px] rounded-full shadow-[0_0_40px_rgba(0,0,0,0.3)] transition-transform duration-500 hover:scale-[1.03]"
            style={{
              background: "linear-gradient(44deg, #520e63, #651279, #b221d2)",
            }}
          >
            <div
              className="absolute w-[420px] h-[420px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-full z-[1]"
              style={{
                background: "linear-gradient(44deg, #520e63, #651279, #b221d2)",
              }}
            />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white w-[70%] z-[2]">
              <h3 className="text-[28px] font-semibold whitespace-pre-line leading-snug m-0">
                {currentModule.title}
              </h3>
              <p className="text-[16px] mt-2 opacity-80">
                {currentModule.description}
              </p>
              <Link
                href={`/courses-new/${courseId}/module/${currentModule.id}`}
                className="inline-block mt-4 text-white underline hover:text-blue-200 transition-all"
              >
                Start Module →
              </Link>
            </div>

            {activeModules.map((m: any, i: number) => {
              const total = activeModules.length;
              const angle = (360 / total) * i;
              const isActive = m.id === currentModule.id;

              return (
                <Link
                  key={m.id}
                  href={`/courses-new/${courseId}?tab=${m.id}`}
                  className="absolute w-1/2 h-1/2 top-0 left-1/2 origin-bottom-left z-0"
                  style={{
                    transform: `rotate(${angle}deg)`,
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                  }}
                >
                  <div
                    className={`w-full h-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-white/30 text-[#0A29B3]"
                        : "hover:bg-white/25"
                    } p-2`}
                  >
                    <div
                      className="text-white text-[18px] text-center leading-snug break-words"
                      style={{
                        transform: `rotate(-${angle}deg)`,
                        maxWidth: "100px",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                      }}
                    >
                      {m.title}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("CourseOverview load error:", error);
    return <div className="text-red-600">Error loading course data</div>;
  }
}
