function Service() {
  const services = [
    {
      id: 1,
      title: "Who we are",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat accusantium culpa ratione et quos ipsum saepe quidem aliquid, ad quod consequatur minus repudiandae esse enim at exercitationem nulla sed ea!",
      image: "assets/omo1.jpg"
    },
    {
      id: 2,
      title: "Why we Care",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat accusantium culpa ratione et quos ipsum saepe quidem aliquid, ad quod consequatur minus repudiandae esse enim at exercitationem nulla sed ea!",
      image: "assets/omo2.jpg"
    },
    {
      id: 3,
      title: "What we Got",
      description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat accusantium culpa ratione et quos ipsum saepe quidem aliquid, ad quod consequatur minus repudiandae esse enim at exercitationem nulla sed ea!",
      image: "assets/omo3.png"
    }
  ];

  return (
    <div className="relative w-full py-16 ">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <span className="text-lg font-semibold tracking-wide text-red-500 uppercase">
            Our Services
          </span>
          <h2 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">
            What We Offer
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit alias
            numquam sed fugiat deserunt cumque.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {services.map((service) => (
            <div 
              key={service.id}
              className="overflow-hidden transition-all duration-300 bg-white shadow-lg rounded-2xl hover:shadow-xl hover:-translate-y-2 group"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/20 to-transparent group-hover:opacity-100" />
              </div>
              
              {/* Content */}
              <div className="p-6 lg:p-8">
                <h3 className="mb-4 text-2xl font-bold text-gray-900 lg:text-3xl">
                  {service.title}
                </h3>
                <p className="leading-relaxed text-gray-600">
                  {service.description}
                </p>
                
                {/* Learn More Button */}
                <button className="inline-flex items-center mt-6 font-semibold text-red-500 transition-colors duration-200 hover:text-red-600 group/btn">
                  Learn More
                  <svg 
                    className="w-4 h-4 ml-2 transition-transform duration-200 group-hover/btn:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

      
      
      </div>
    </div>
  );
}

export default Service;