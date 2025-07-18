/* courses-new/page.tsx */
"use client";

import React from "react";
import "@/app/app.css";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Updated course list with 'active' flag
const courseList = [
  {
    id: "clarity-canvas",
    title: "Clarity Canvas",
    subtitle: "Reset your path. Align your life.",
    description:
      "A self-guided journey to rediscover your purpose, design a fulfilling lifestyle, and gain momentum for what matters most.",
    emoji: "🧭",
    active: "yes",
  },
  {
    id: "reset-finances",
    title: "Reset Finances (Coming Soon)",
    subtitle: "Take back control of your money",
    description:
      "Build a simplified, empowering relationship with your finances. Create clarity, flow, and freedom through intentional money habits.",
    emoji: "💸",
    active: "no",
  },
];

export default function CoursesNewIndex() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-24">
        <div className="flex flex-col md:flex-row justify-evenly items-start w-full">
          {courseList.map((course, idx, arr) => (
            <React.Fragment key={course.id}>
              {/* Card */}
              <div className="relative w-full md:w-[30%] px-6 pt-6 pb-10 min-h-[350px] border border-gray-300 rounded-tl-[4rem] rounded-br-[4rem] shadow-md flex flex-col justify-between ">
                <p className="text-4xl text-[#ccc]  mb-4">
                  <span>{course.emoji}</span> {course.title}
                </p>
                <p className="italic text-lg text-[#9f9f9f] mb-4 font-[Merriweather]">
                  {course.subtitle}
                </p>
                <p className="leading-relaxed text-[#ccc] text-xl">
                  {course.description}
                </p>
                {course.active === "yes" ? (
                  <div className=" flex justify-center ">
                    <button className="w-48 bg-[rgb(255,105,180)] hover:bg-[rgb(255,85,160)] text-white px-4 py-2 rounded mt-4">
                      <Link href={`/courses-new/${course.id}`}>
                        Enter Course
                      </Link>
                    </button>
                  </div>
                ) : (
                  <div className=" flex justify-center ">
                    <Button
                      disabled
                      className="w-48 bg-gray-400 text-gray-700 cursor-not-allowed "
                    >
                      Coming Soon
                    </Button>
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* ))} */}
      </div>
    </div>
  );
}
