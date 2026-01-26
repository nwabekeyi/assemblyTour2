import React from "react";
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
import Loading from "../components/Spinner/Loading";
import { useHomeContent } from "../hooks/useHomeContent";

function Homepage() {
  const { experienceSection, recentBlogs, recentSacredSites, allPackages, faqs, loading, error } = useHomeContent();
  if (loading) return <Loading />;

  return (
    <div className="flex flex-col w-full">
      {/* Pass heroSlides to Hero component */}
      <Hero/>

      {/* Pass experienceSection to AboutUs component */}
      <AboutUs experienceSection={experienceSection} />

      {allPackages && allPackages.length > 0 && (
        <TourPackages allPackages={allPackages} />
      )}

      {/* Render FeaturedBlogs only if there are recent blogs */}
      {recentBlogs && recentBlogs.length > 0 && (
        <FeaturedBlogs blogs={recentBlogs} />
      )}

      <TopReviewedDestinations />

      {recentSacredSites && recentSacredSites.length > 0 && (
        <Attraction  recentSacredSites={recentSacredSites} />
      )}
      <Cta />
      <Customer />

      {faqs && faqs.length > 0 && (
        <Faq  faqs={faqs} />
      )}
    </div>
  );
}

export default Homepage;
