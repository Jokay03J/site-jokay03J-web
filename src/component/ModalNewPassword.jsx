import { Dialog, Transition } from '@headlessui/react';
import { KeyIcon } from '@heroicons/react/outline';
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Alert from './Alert';

const ModalNewPassword = ({ open = false, onClose }) => {

  const [newPassword, setNewPassword] = useState("");
  const [repeteNewPassword, setRepeteNewPassword] = useState("");
  const [alertType,setAlertType] = useState("valid")
  const [alertOpen,setAlertOpen] = useState(false);
  const [t, i18n] = useTranslation();

  function Submit() {
    if(newPassword !== repeteNewPassword) return alert("les mots de passes ne sont pas les mêmes")
    if(!/[\s~`!@#$%&*+=\-\]\\';,/{}|\\":<>()_]/g.test(newPassword)) return alert(`
    votre mot de passe n'est pas assez fort!\n
    >votre mot de passe doit contenir au moins 8caractère\n
    >il doit aussi contenir au moins un caractère spécial
    `)
  }

  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={onClose}>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                    <KeyIcon className='h-6 w-6 text-red-600' aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      {t("changePasswordTitle")}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {t("changePasswordText")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <label htmlFor="actualpsd" className="block text-sm font-medium text-gray-700">
                    nouveaux mot de passe
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      name="email"
                      onChange={(e) => setNewPassword(e.currentTarget.value)}
                      id="actualpsd"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  répeter le nouveaux mot de passe
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    name="email"
                    onChange={(e) => setRepeteNewPassword(e.currentTarget.value)}
                    id="newpsd"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="you@example.com"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => Submit()}
                  className="mt-4 py-2 w-full border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default ModalNewPassword;