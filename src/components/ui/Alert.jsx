// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { hideAlert } from '../../redux/alert/action';

// const Alert = () => {
//    const dispatch = useDispatch();
//    const { message, type, show } = useSelector((state) => state.alert);

//    useEffect(() => {
//       if (show) {
//          const timer = setTimeout(() => {
//             dispatch(hideAlert());
//          }, 3000); 
//          return () => clearTimeout(timer);
//       }
//    }, [show, dispatch]);

//    if (!show) return null;

//    const typeColor = {
//       success: 'bg-green-100 text-green-700 border-green-400',
//       error: 'bg-red-100 text-red-700 border-red-400',
//       info: 'bg-blue-100 text-blue-700 border-blue-400',
//       warning: 'bg-yellow-100 text-yellow-700 border-yellow-400',
//    };

//    return (
//       <div className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded border shadow-md transition duration-300 ${typeColor[type] || typeColor.info}`}>
//          <p className='text-sm font-medium'>{message}</p>
//       </div>
//    );
// };

// export default Alert;


import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideAlert } from '../../redux/alert/action';

const Alert = () => {
   const dispatch = useDispatch();
   const { message, type, show } = useSelector((state) => state.alert);

   if (!show) return null;

   const typeColor = {
      success: 'bg-green-100 text-green-800 border-green-400',
      error: 'bg-red-100 text-red-800 border-red-400',
      info: 'bg-blue-100 text-blue-800 border-blue-400',
      warning: 'bg-yellow-100 text-yellow-800 border-yellow-400',
   };

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40">
         <div className={`w-96 rounded-lg p-6 border shadow-lg ${typeColor[type] || typeColor.info}`}>
            <h2 className="text-lg font-semibold mb-3">Pesan</h2>
            <p className="mb-5 text-sm">{message}</p>
            <button
               onClick={() => dispatch(hideAlert())}
               className="bg-[#3b82f6] text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
            >
               OK
            </button>
         </div>
      </div>
   );
};

export default Alert;
