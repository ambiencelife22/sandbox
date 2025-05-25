'use client'
import { Fragment, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { motion } from 'framer-motion'

export default function SimpleModal(props: any) {

    const [modelVisible, setModelVisible] = useState(props.visible)
    const [openModal, setOpenModal] = useState(true)
    function setOpen(value: boolean): void {
        setModelVisible(false)
        props.resetModal()
    }

    function resetModal() {
        setModelVisible(false)
    }


    return (
        <Transition.Root show={modelVisible} as={Fragment}>
            <Dialog as='div' className='relative z-[99]' onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 transition-opacity' />
                </Transition.Child>
                <div className='fixed inset-0 z-[99] overflow-y-auto default_overlay_bg'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0 mb-[121px] '>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            enterTo='opacity-100 translate-y-0 sm:scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}
                            >
                                <Dialog.Panel className='default_hello_modal xlg_modal z-[99] relative transform overflow-hidden rounded-lg back-offwhite px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6'>
                                    <div>
                                        <div className='mt-3 text-left sm:mt-5'>
                                            <h2 className='purple1 text-2xl text-[Plus Jakarta Sans] font-extrabold mb-4'>{props.modalMeta[0].modalTitle}</h2>
                                            <p className='mb-4 pjs'>{props.modalMeta[0].modalDescription}</p>
                                            <p className='mb-4 pjs'>{props.modalMeta[0].modalDescription2}</p>
                                            <p className='mb-4 pjs'>{props.modalMeta[0].modalDescription3}</p>
                                            <p className='mb-4 pjs'>{props.modalMeta[0].modalDescription4}</p>
                                            <p className='mb-4 pjs'>{props.modalMeta[0].modalDescription5}</p>
                                        </div>
                                    </div>
                                    <div className='mt-5 sm:mt-6'>
                                        <button
                                            type='button'
                                            className='bg-[#81188f] inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm'
                                            onClick={() => setOpen(true)}
                                        >
                                            {props.modalMeta[0].buttonLabel}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </motion.div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

