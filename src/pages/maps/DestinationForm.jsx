const DestinationForm = ({ showForm, onSubmit }) => {
   return (
      <div
         className={`
         absolute z-[1000] left-6 right-6 bg-white p-4 rounded-md shadow-lg 
         transition-all duration-500 ease-in-out
         ${showForm ? "bottom-32 opacity-100 translate-y-0" : "-bottom-60 opacity-0 translate-y-10"}
       `}
      >
         <form onSubmit={onSubmit}>
            <input
               name="destination"
               placeholder="Masukkan tujuan (lat,lng / alamat)"
               className="w-full border p-2 rounded-md"
            />
            <button
               type="submit"
               className="mt-2 w-full bg-blue-600 text-white p-2 rounded-md"
            >
               Cari Rute
            </button>
         </form>
      </div>
   );
}

export default DestinationForm