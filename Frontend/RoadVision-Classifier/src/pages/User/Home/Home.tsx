import HomeComponent from "../../../components/Home/HomeComponent";
import AboutUsComponent from "../../../components/Home/AboutUsComponent";
import AppLayout from "../../../components/Common/AppLayout";
import { useState } from "react";
export default function Home() {
  const [currentComponent, setCurrentComponent] = useState("home");
  const handleAboutUs = () => {
    setCurrentComponent("aboutUs");
  };
  return (
    <AppLayout>
      <div>
        {currentComponent === "home" ? (
          <HomeComponent onAboutUsClick={handleAboutUs} />
        ) : (
          <AboutUsComponent />
        )}
      </div>
    </AppLayout>
  );
}
