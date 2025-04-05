/* CourseSidebar.tsx */
import React from 'react'

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
  }

  const CourseSectionSidebar: React.FC<SidebarProps> = ({ isOpen, onClose, children }) => {
  return (
    <div className={`sidebar ${isOpen ? 'sidebar_open' : ''}`}>
      {children}
    </div>
  )
}

export default CourseSectionSidebar