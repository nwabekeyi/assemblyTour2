import Hero from "../components/Hero";
import Customer from "../components/Customers/Customer";
import Faq from "../components/Faq/faqs";
import OurServices from "../components/OurServices";
import Cta from "../components/sharedComponents/Cta";
import AboutUs from "../components/AboutUs";
import Places from "../components/Destination/Places";
import FeaturedBlogs from "../components/Blog/FeaturedBlogs";
import TopReviewedDestinations from "../components/Destination/TopReviewedDestinations";
import TourPackages from "../components/Destination/TourPackages";
import Attraction from "../components/Attraction";
// import  { useContext } from 'react';
// import ThemeContext from '../components/Theme/ThemeContext';
function homepage() {
  // const { theme } = useContext(ThemeContext);

  // const styles = {
  //   backgroundColor: theme === 'light' ? 'white' : 'black',
  //   color: theme === 'light' ? 'black' : 'white',
  // };
  return (
    <div className="flex flex-col w-full">
      <Hero/>
      <AboutUs />
      <TourPackages />
      <FeaturedBlogs />
      <TopReviewedDestinations />
      <Attraction />
      <Cta />
       <Customer />
      <Faq />
    </div>
  );
}

export default homepage;
