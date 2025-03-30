import React, { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface IntroPopUpProps {
  resetModal: () => void
  sessionType: string
  sessionTheme: string
  modalMeta: any // replace 'any' with the actual type
}

const IntroPopUp: React.FC<IntroPopUpProps> = (props) => {
  const [modelVisible, setModelVisible] = useState(true)

  // need to solve close functionality
  function setOpen(value: boolean): void {
    setModelVisible(false)
    props.resetModal()
  }
  
  // depending on button id change content
  return (
    <Transition.Root show={modelVisible} as={Fragment}>
      <Dialog as="div" className="relative z-10 hello_modal" onClose={setOpen}>
                  <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                  >
                      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                  </Transition.Child>
  
                  <div className="fixed inset-0 z-10 overflow-y-auto">
                      <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0 ">
                          <Transition.Child
                              as={Fragment}
                              enter="ease-out duration-300"
                              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                              enterTo="opacity-100 translate-y-0 sm:scale-100"
                              leave="ease-in duration-200"
                              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                          >
                              <Dialog.Panel className="xlg_modal relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                  <div className='activities_modal_container'>
                                      <div className="mt-3 text-center sm:mt-5">
                                          <h2 className='text-sky-700 text-2xl lato'>{props.modalMeta.modalTitle}!</h2>
                                          <p>{props.modalMeta.modalDescription}</p>
                                      </div>
                                  </div>
                                  <div className="mt-5 sm:mt-6">
                                      <button
                                          type="button"
                                          className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium p_color shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                                          onClick={() => setOpen(false)}
                                      >
                                          Back To {props.modalMeta.buttonLabel}
                                      </button>
                                  </div>
                              </Dialog.Panel>
                          </Transition.Child>
                      </div>
                  </div>
              </Dialog>
    </Transition.Root>
  )
}

export default IntroPopUp
