import HomeComponent from "../../../components/Home/HomeComponent";
import AboutUsComponent from "../../../components/Home/AboutUsComponent";
import { useState } from "react";
export default function Home() {
  const [currentComponent, setCurrentComponent] = useState("home");
  const handleAboutUs = () => {
    setCurrentComponent("aboutUs");
  };
  return (
    <div>
     {currentComponent === "home" ? (
        <HomeComponent onAboutUsClick={handleAboutUs} />
      ) : (
        <AboutUsComponent />
      )}
    </div>
  );
}
