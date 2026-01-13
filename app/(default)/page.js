
export default function Home() {
  return (
    <>
      {/* 1. Hero Section: Changed min-h-screen to h-[44vh] and added justify-center */}
      <div className="flex flex-col gap-4 items-center justify-center text-white h-[44vh] px-6">
        
        {/* Removed mt-40 so flexbox centers it automatically */}
        <h1 className="text-5xl md:text-6xl font-bold text-purple-500">
          GET ME A COFFEE
        </h1>

        <p className="max-w-2xl text-base md:text-lg text-gray-300">
          Get Me a Coffee makes supporting fun and easy. <br />
          In just a couple of taps, your fans can make the payment and leave a message.
        </p>

        <div className="flex gap-6 mt-5">
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Start Here
          </button>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Read More
          </button>
        </div>
      </div>

      {/* 2. Division: Fixed height and opacity */}
      <div className="bg-white h-1 opacity-20"></div>

      <div className="flex justify-center mt-10 text-4xl font-bold">
        Your Fans can buy you a Coffee
      </div>
     
     <div className="grid grid-cols-3 gap-90 mt-15 px-30 mx-60">
         {/* Card 1 */}
  <div>
 
  <img src="/telecommuting.gif" className="border border-black/50 rounded-4xl mb-6" />
   <h2 className="text-xl font-semibold mb-2 whitespace-nowrap">
    Fans want to help
  </h2>
 <h3 className="text-sm text-gray-400 leading-relaxed whitespace-nowrap">
    Fans are available to support you
  </h3>
</div>

     {/* Card 2 */}
     <div>
  <img src="/dollar.gif" className="border border-black/50 rounded-4xl mb-6" />
   <h2 className="text-xl font-semibold mb-2 whitespace-nowrap">
    Fans want to contribute
  </h2>
 <h3 className="text-sm text-gray-400 leading-relaxed whitespace-nowrap">
    Fans are willing to contribute financially
  </h3>
</div>
   
   {/* Card 3 */}
   <div>
  <img src="/collaboration.png" className="border border-black/50 rounded-4xl mb-6" />
   <h2 className="text-xl font-semibold mb-2 whitespace-nowrap">
    Fans want to collabrate
  </h2>
 <h3 className="text-sm text-gray-400 leading-relaxed whitespace-nowrap">
    Fans are ready to collabrate with you
  </h3>
</div>
</div>

{/* Division 3 */}
<div className="bg-white h-px opacity-20 mt-20"></div>

<div className="flex flex-col items-center justify-center text-center mt-10 px-4">
  <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
    Learn more about us
  </h1>

  <div className="w-full max-w-3xl aspect-video rounded-xl overflow-hidden shadow-lg mb-10">
    <iframe
      className="w-full h-full mx-10"
      src="https://www.youtube.com/embed/fjHO4fAfCf0?rel=0&modestbranding=1"
      title="Learn more about us"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
</div>

    </>
  );
}