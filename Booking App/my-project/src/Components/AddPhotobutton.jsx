import React from "react";
import { AiOutlineCloudUpload, AiOutlineWifi } from "react-icons/ai";
import { ImBin } from "react-icons/im";
const AddPhotobutton = ({ Photo, upload_by_button ,setPhoto}) => {
  const deleteseelctedpic=(img)=>{
    setPhoto((prev)=>{
      const updatedimages = prev.filter(
        (oldimages) => oldimages !== img
      );
      return updatedimages;
    })
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6  mt-2 rounded-2xl gap-3 border-2 md:p-3 py-2 ">
      {Photo.length > 0 &&
        Photo.map((link,index) => (
          <div className="rounded-2xl relative" key={index}>
            <img
              className="rounded-2xl"
              src={"http://127.0.0.1:3000/uploads/" + link}
              
            ></img>
            <ImBin size={20} className="absolute bottom-1 right-1 text-white bg-black bg-opacity-50 cursor-pointer" onClick={(e)=>deleteseelctedpic(link)} />
          </div>
        ))}
      <label className="flex justify-center py-10 items-center bg-transparent border-2 rounded-2xl cursor-pointer">
        <AiOutlineCloudUpload size={20} />
        <input
          type="file"
          className="hidden"
          multiple
          onChange={upload_by_button}
        />
        <h2 className=""> Upload</h2>
      </label>
    </div>
  );
};

export default AddPhotobutton;
