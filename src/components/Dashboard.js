import React from 'react'

const Dashboard = () => {
  return (
    <React.Fragment>
        <div className="p-4 sm:ml-64">
   <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
   <div className="flex items-center justify-center h-96 mb-4 rounded bg-gray-50 dark:bg-gray-800 hover:dark:text-white ">
         <p className="text-2xl">
               images 
         </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
         <div className="flex items-center justify-center rounded bg-purple-50 h-28 dark:bg-purple-800 hover:dark:text-white hover:dark:bg-purple-700">
            <p className="text-2xl ">
              All Events
            </p>
            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-purple-800 bg-purple-100 rounded-full dark:bg-purple-900 dark:text-purple-300">3</span>
         </div>
         <div className="flex items-center justify-center rounded bg-indigo-50 h-28 dark:bg-indigo-800 hover:dark:text-white">
            <p className="text-2xl ">
               Upcomming Events
            </p>
            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-indigo-800 bg-indigo-100 rounded-full dark:bg-indigo-900 dark:text-indigo-300">3</span>
         </div>
         <div className="flex items-center justify-center rounded bg-green-50 h-28 dark:bg-green-800 hover:dark:text-white">
            <p className="text-2xl ">
               Completed Events
               <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-300">3</span>
            </p>
         </div>
         <div className="flex items-center justify-center rounded bg-orange-50 h-28 dark:bg-orange-800 hover:dark:text-white">
            <p className="text-2xl">
               Expired Events
            </p>
            <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-red-800 bg-green-100 rounded-full dark:bg-red-900 dark:text-red-300">3</span>
         </div>
      </div>
     
      {/* <div className="grid grid-cols-2 gap-4">
        
      </div> */}
   </div>
</div>
    </React.Fragment>
  )
}

export default Dashboard