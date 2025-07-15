const PageLayout = ({ children }) => {
   return (
      <div className="w-full min-h-screen flex justify-center bg-gradient-to-br from-[#f0f4f8] via-[#e5eaf1] to-[#f7f9fc] font-poppins">
         <div className="w-full max-w-lg px-6 pb-5">
            {children}
         </div>
      </div>
   );
};

export default PageLayout