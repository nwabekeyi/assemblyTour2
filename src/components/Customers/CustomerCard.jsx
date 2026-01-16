import { useState, useEffect, useRef } from "react";
import { IoMdHappy, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// CustomerCard Component
function CustomerCard(props) {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="group shadow-lg max-w-[400px] my-5 mx-4 text-center font-sans rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex-shrink-0">
      <div className="bg-gradient-to-r from-[#34D399] via-[#3B82F6] to-[#8B5CF6] pt-6 pb-4 relative overflow-hidden">
        <div className="absolute inset-0 origin-top-right transform -skew-y-6 bg-white/10"></div>
        <img
          className="object-cover w-32 h-32 mx-auto transition-transform duration-500 border-4 border-white rounded-full shadow-lg group-hover:scale-110"
          src={props.url}
          alt={props.name}
        />
        <div className="absolute transform -translate-x-1/2 -bottom-4 left-1/2">
          <IoMdHappy className="text-4xl text-white bg-gradient-to-r from-[#34D399] to-[#3B82F6] rounded-full p-2" />
        </div>
      </div>
      
      <div className="relative px-4 py-6 bg-white">
        <div className="absolute w-4 h-4 transform rotate-45 -translate-x-1/2 bg-white -top-2 left-1/2"></div>
        <h4 className="text-2xl font-bold bg-gradient-to-r from-[#34D399] to-[#3B82F6] bg-clip-text text-transparent capitalize mb-3">
          @{props.name}
        </h4>
        <p className="mb-4 font-serif text-lg italic leading-relaxed text-gray-600">
          <q>{props.description}</q>
        </p>
        <div className="flex items-center justify-center text-sm text-gray-500">
          <span className="px-3 py-1 bg-gray-100 rounded-full">
            {currentDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
 export default CustomerCard;