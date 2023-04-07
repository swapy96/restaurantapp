import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdCloudUpload, MdFastfood, MdDelete, MdFoodBank, MdAttachMoney } from "react-icons/md";
import { categories } from "../utils/data";
import Loader from "./Loader";

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null); // img download url
  const [fields, setFields] = useState(false); // to monitor error - if error dispaly those fields then display alertMessage
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);

  // state to monitor loading status
  const [isLoading, setIsLoading] = useState(false);

  // function to upload image
  const uploadImage = () => {};
  const deleteImage = () => {};
  const saveFoodItem = () => {};

  return (
    <div className="w-full min-h-screen flex justify-center items-center`">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opatity: 0 }}
            animate={{ opatity: 1 }}
            exit={{ opatity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold 
            ${alertStatus === "danger" ? "bg-red-400 text-red-800" : "bg-emerald-800"}`}
          >
            {msg}
          </motion.p>
        )}
        {/* input field title */}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className=" text-xl text-gray-700" />
          <input type="text" required placeholder="Enter food title.." value={title} onChange={(e) => setTitle(e.target.value)} className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor" />
        </div>
        <div className="w-full">
          <select onChange={(e) => setCategory(e.target.value)} className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer">
            <option value="other" className="bg-white">
              Select Category
            </option>
            {categories &&
              categories.map((foodCategory) => (
                <option key={foodCategory.id} className="text-base bottom-0 outline-none capitalize bg-white text-headingColor" value={foodCategory.urlParamName}>
                  {foodCategory.name}
                </option>
              ))}
          </select>
        </div>

        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label htmlFor="" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">Click her to UPLOAD</p>
                    </div>
                    <input type="file" name="uploadImage" accept="image/*" className="w-0 h-0" onChange={uploadImage} />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full ">
                    <img src={imageAsset} alt="uloaded image" className="w-ful h-full object-cover" />
                    <button type="button" className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out" onClick={deleteImage}>
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="w-full flex flex-col  md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl " />
            <input type="text" required placeholder="How many Calories?" value={calories} onChange={(e) => setTitle(e.target.value)} className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor" />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl " />
            <input type="text" required placeholder="Price" value={price} onChange={(e) => setTitle(e.target.value)} className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor" />
          </div>
        </div>

        <div className="flex items-center w-full">
          <button type="button" className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold" onChange={saveFoodItem}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
