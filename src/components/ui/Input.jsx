import React from 'react'

const Input = ({
   type,
   placeholder = '',
   value,
   onChange,
   name,
   id,
   className = '',
   label,
   error,
   disabled = false,
   ...rest
}) => {
   return (
      <div className="flex flex-col w-full">
         {label && (
            <label
               htmlFor={id}
               className="mb-1 text-sm font-medium text-gray-700 font-poppins"
            >
               {label}
            </label>
         )}
         <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            id={id}
            disabled={disabled}
            className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-poppins text-gray-900 placeholder-gray-400 border-gray-300 ${className} ${error ? 'border-red-500' : ''
               } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            {...rest}
         />
         {error && (
            <span className="mt-1 text-sm text-red-500 font-poppins">{error}</span>
         )}
      </div>
   )
}

export default Input