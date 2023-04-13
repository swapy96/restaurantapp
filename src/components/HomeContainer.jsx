import React from "react";
import Delivery from "../img/delivery.png";
import HeroBg from "../img/heroBg.png";
import { heroData } from "../utils/data";
import { Link } from "react-router-dom";

const HomeContainer = () => {
  return (
    <section
      className="grid grid-cols-1
      md:grid-cols-2 gap-2 w-full"
      id="home"
    >
      <div className=" py-2 flex-1 flex flex-col items-start justify-center md:items-center gap-6">
        <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">Delivery Available</p>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-white drop-shadow-xl">
            <img src={Delivery} alt="Delivery Vehical" className="w-full h-full object-contain" />
          </div>
        </div>

        <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
          The Fastest Delivery in <span className="text-orange-600 text-[3rem] lg:text-[5rem]">Vancouver!</span>
        </p>
        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">"Savor the taste of succulent chicken dishes with a tempting 20% off at our restaurant. Book now and treat yourself to a delicious meal that will leave you craving for more!"</p>
        <Link className="w-full flex justify-center" to={"/login"}>
          <button type="button" className="w-full bg-gradient-to-br from-orange-400 to-orange-500 md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out">
            Sign UP Now!
          </button>
        </Link>
        <p className="text-teal-500 text-xl text-center">Don't miss out on our irresistible SigningUp offer - a 35% discount on first 2 orders for a limited time only!</p>
      </div>

      {/* right side */}
      <div className="py-2 flex-1 flex items-center relative">
        <img src={HeroBg} alt="Herobg" className="ml-auto h-420 w-full lg:w-auto lg:h-650" />

        <div className="w-full h-full absolute top-0 left-0 flex items-center lg:px-32 py-4 gap-4 flex-wrap">
          {heroData &&
            heroData.map((foodItem) => (
              <div key={foodItem.id} className="  lg:w-190  p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg">
                <img src={foodItem.imageSrc} className="w-20 lg:w-40 -mt-10 lg:-mt-20 " alt="I1" />
                <p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">{foodItem.name}</p>

                <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">{foodItem.decp}</p>

                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-xs text-red-600">$</span> {foodItem.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
