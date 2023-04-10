import React, { useRef, useEffect } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();
  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  return (
    <div ref={rowContainer} className={`flex items-center gap-3 w-full my-12 scroll-smooth ${flag ? "overflow-x-scroll scrollbar-none " : "overflow-x-hidden flex-wrap"}`}>
      {data &&
        data.map((item) => (
          <div key={item.id} className="w-300 min-w-[300px] md:w-340 md:min-w-[340px] h-auto bg-cardOverlay rounded-lg p-2 my-12 backdrop-blur-lg hover:drop-shadow-lg">
            <div className="w-full flex items-center justify-between">
              <motion.img whileHover={{ scale: 1.2 }} src="https://firebasestorage.googleapis.com/v0/b/restaurantapp-2b979.appspot.com/o/Images%2F1680942120087-c4.png?alt=media&token=97037acb-437e-4570-96bc-86087b01f05d" alt="food item" className="w-40 -mt-8 drop-shadow-2xl" />
              <motion.div whileTap={{ scale: 0.75 }} className="w-8 h-8 rounded-full bg-red-600 flex justify-center cursor-pointer hover:shadow-md items-center">
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>
            <div className="w-full flex flex-col items-end justify-end">
              <p className="text-textcolor font-semibold text-base md:text-lg">Chicken fried</p>
              <p className="mt-1 text-sm text-gray-500 ">Calories 45</p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">$</span>5.25
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RowContainer;
