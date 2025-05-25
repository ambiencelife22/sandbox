export interface Paragraph {
    id: string
    type: 'par' | 'parWithImage' | 'parWithVideo'
    content: string | { url: string, alt?: string, pContent?: string } | { url: string, pContent?: string } | { url?: string, alt?: string, pContent?: string }
    parClass?: string | null
}

export interface Topic {
topicName: string
topicUrl: string
paragraphs: Paragraph[]
link: string
linkText: string
topicQuestion?: string
topicQuestionPrompt?: string
}

export interface CourseSection {
id: number
section: string
sectionUrl: string
sectionLaunch: string
about: {
    about1Subheadline?: string
    about1: string
    about2Subheadline?: string
    about2: string
    about3Subheadline?: string
    about3: string
}
topics: Topic[]
}

export interface CourseAbout {
about1?: string
about2?: string
about3?: string
}

export interface FullCourseData {
id: number
name: string
urlParam: string
urlCourse: string
shortDescrip: string
medDescrip1?: string
medDescrip2?: string
medDescrip3?: string
medDescrip4?: string
about?: CourseAbout
sections: CourseSection[]
}

export interface CourseSectionData {
id: number
section: string
sectionUrl: string
sectionLaunch: string
about: {
    about1: string
    about2: string
    about3: string
}
topics: Topic[]
}

// import { Paragraph, Topic, CourseSection, CourseAbout, FullCourseData, CourseSectionData } from '@/utils/(structure)/InterfacesCoursesHumanHarmony'