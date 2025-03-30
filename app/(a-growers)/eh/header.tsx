import React from 'react'

interface HeaderProps {
    pageTitle: string
    pageDescrip1: string
    pageDescrip2: string
    pageDescrip2Link?: string
}

const Header: React.FC<HeaderProps> = ({ pageTitle,pageDescrip1, pageDescrip2, pageDescrip2Link }) => {
    return (
        <div className='al_client_page_meta lg:flex md:block'>
            <h1 className='text-3xl font-bold text-left mb-2 text-gray-100 relative max-w-[440px]'>{pageTitle}</h1>
            <div className='section_descriptor max-w-lg'>
                <p className='text-lg p_color pjs non-italic pb-2'>{pageDescrip1}</p>
                {pageDescrip2Link ? (
                    <p className='text-lg p_color pjs non-italic pb-2'>
                        <a href={pageDescrip2Link} className='hover:underline hover:text-[#7FDEFF]' target='_blank'>
                        {pageDescrip2}
                        </a>
                    </p>
                    ) : (
                    <p className='text-lg p_color pjs non-italic pb-2'>{pageDescrip2}</p>
                    )}
            </div>
        </div>
    )
}

export default Header
