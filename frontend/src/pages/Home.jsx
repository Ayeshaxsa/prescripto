import React from "react";
import Header from "../components/Header.jsx";
import SpecialtyMenu from "../components/SpecialtyMenu.jsx";
import TopDoctors from "../components/TopDoctors.jsx";
import Banner from "../components/Banner.jsx";

const Home = () => {
  return (
    <div className="space-y-6">
      <Header />
      <SpecialtyMenu />
      <TopDoctors />
      <Banner />
    </div>
  );
};

export default Home;
