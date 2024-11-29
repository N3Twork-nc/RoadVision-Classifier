import homeheader from "../../../assets/img/home-header.png";
import mask from "../../../assets/img/mask.png";
import AppLayout from "../../../components/Common/AppLayout";
import Slider from "../../../components/Home/Slider";

export default function Home() {
  return (
    <AppLayout>
      <div className="w-full min-h-screen bg-[#F9F9F9] flex flex-col p-5 gap-5 justify-start items-center overflow-y-auto">
        {/* HEADER */}
        <div className="flex flex-row w-[95%] h-60 rounded-2xl bg-[#2D82C6] justify-between relative">
          <img
            src={mask}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-2xl"
          />
          <div className="relative z-100 w-full flex flex-row justify-between">
            {/* content */}
            <div className="flex flex-col p-10 justify-between">
              <div>
                <p className="text-4xl font-bold text-white">
                  Welcome to RoadVision Classifier
                </p>
                <p className="text-white">
                  Upload an image to classify the road condition
                </p>
              </div>
              <button className="w-32 bg-white text-[#3749A6] font-bold p-3 rounded-full hover:ring-3 hover:ring-[#3749A6]">
                About us
              </button>
            </div>
            {/* image */}
            <img src={homeheader} className="p-2 mr-10 h-full" />
          </div>
        </div>
        {/* BODY */}
        <div className="bg-white w-[95%] h-full rounded-2xl">
          <div className="flex flex-row justify-between p-10 gap-10">
            {/* image */}
            <div className="w-1/2 ">
              <Slider />
            </div>
            {/* content */}
            <div className="flex flex-col w-1/2 justify-between">
              <div className="w-full">
                <p className="text-3xl font-bold">Abstraction</p>
                <p className="mt-5">
                  Cracks are common pavement distresses that seriously affect road
                  safety and driving safety. For transportation agencies in most
                  provinces and cities, maintaining high-quality road surfaces is
                  one of the keys to maintaining road safety. The timely detection
                  of pavement cracks is of great significance to prevent road
                  damage and maintain traffic road safety.
                </p>
                <p className="mt-5">
                  From the data we collect, we will map out a flat and safe route
                  for you so you can enjoy your trip without feeling uncomfortable
                  because of bad roads. Besides, it will also provide enough
                  information to be able to repair severely damaged roads in a
                  timely manner
                </p>
              </div>
              <div className="w-full flex justify-end">
                <button className="w-32 bg-[#3749A6] text-white font-semibold p-3 rounded-full hover:ring-4 hover:ring-blue-300">
                  Get started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
