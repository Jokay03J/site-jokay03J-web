import { Dialog, Transition } from '@headlessui/react'
import { CheckCircleIcon, ExclamationCircleIcon, ExclamationIcon } from '@heroicons/react/outline'
import { XIcon } from '@heroicons/react/solid'

export default function Alert({ open = false, onClose, type = "valid", title = "une erreur est survenue", message = "veuillez réesayer plus tard" }) {
  return (
    <div className="rounded-md bg-green-50 p-4 z-50">
      <div className="flex">
        <div className="flex-shrink-0">
          {type === "valid" ? <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" /> : null}
          {type === "error" ? <ExclamationCircleIcon className='h-6 w-6 text-red-400' aria-hidden="true" /> : null}
          {type === "waring" ? <ExclamationIcon className='h-6 w-6 text-orange-400' aria-hidden="true" /> : null}
        </div>
        <div className="ml-3">
          <p className={`text-sm font-medium text-green-800`}>Successfully uploaded</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              onClick={() => onClose}
              className="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
