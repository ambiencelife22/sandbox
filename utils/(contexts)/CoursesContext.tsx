/* CoursesContext.tsx */
'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react'


interface CourseContextProps {
  
}

interface CourseProviderProps {
  children: ReactNode
}

const initialCourseContext: CourseContextProps = {

  }
  
  const CourseContext = createContext<CourseContextProps>(initialCourseContext);
  
  export const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
  
    return (
      <CourseContext.Provider value={{}}>
        {children}
      </CourseContext.Provider>
    );
  }

export const useCourseContext = () => {
  const context = useContext(CourseContext)
  if (!context) {
    throw new Error('useCourseContext must be used within a CourseProvider')
  }
  return context
}
