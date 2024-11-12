import { XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { Link } from 'react-router-dom'

const AllProductModel = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-full max-w-lg bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
       
        <div className="p-4 overflow-y-auto">
          <p className="mt-1 text-gray-800 dark:text-neutral-400">
            Your Cart is empty 
          </p>
        </div>
        <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
         
          <Link  to="/"
            type="button" 
            className="py-2 text-center px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          >
           Go to home page 
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AllProductModel
