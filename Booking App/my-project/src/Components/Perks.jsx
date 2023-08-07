import React from "react";
import { GiIndiaGate } from "react-icons/gi";
import { BiSolidRadio } from "react-icons/bi";
import { FaParking } from "react-icons/fa";
import { AiOutlineCloudUpload, AiOutlineWifi } from "react-icons/ai";
import { PiTelevisionFill } from "react-icons/pi";
import { MdPets } from "react-icons/md";
import { RiGamepadFill } from "react-icons/ri";
const Perkspage = ({ Perks, setperks }) => {
  const checkboxchecked = (e) => {
    console.log(e.target.name);
    if (e.target.checked) {
      setperks((prev) => {
        const updatedPerks = [...prev, e.target.name];
        console.log(updatedPerks); // Log the updated array
        return updatedPerks;
      });
    } else {
      setperks((prev) => {
        const updatedperks = prev.filter(
          (oldperks) => oldperks !== e.target.name
        );
        console.log(updatedperks);
        return updatedperks;
      });
    }
  };

  return (
    <div>
      <h2 className="font-bold text-lg mt-2">Perks</h2>
      <p className="text-gray-400 text-sm mt-2">select the perks</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  mt-4 gap-4">
        <label className="flex space-x-2 items-center p-3 border-2 rounded-2xl cursor-pointer">
          <input type="checkbox" name="Wifi" checked={Perks.includes('Wifi')} onChange={checkboxchecked} />
          <AiOutlineWifi size={20} />
          <span className="font-semibold">Wifi</span>
        </label>
        <label className="flex space-x-2 items-center p-3 border-2 rounded-2xl cursor-pointer">
          <input
            type="checkbox"
            name="Free Parking Spot"
            checked={Perks.includes('Free Parking Spot')}
            onChange={checkboxchecked}
          />
          <FaParking size={20} />
          <span className="font-semibold">Free Parking Spot</span>
        </label>
        <label className="flex space-x-2 items-center p-3 border-2 rounded-2xl cursor-pointer">
          <input type="checkbox" checked={Perks.includes('TV')} name="TV" onChange={checkboxchecked} />
          <PiTelevisionFill size={20} />
          <span className="font-semibold">TV</span>
        </label>
        <label className="flex space-x-2 items-center p-3 border-2 rounded-2xl cursor-pointer">
          <input type="checkbox" name="Radio" checked={Perks.includes('Radio')} onChange={checkboxchecked} />
          <BiSolidRadio size={20} />
          <span className="font-semibold">Radio</span>
        </label>
        <label className="flex space-x-2 items-center p-3 border-2 rounded-2xl cursor-pointer">
          <input
            type="checkbox"
            checked={Perks.includes('Private Entrance')}
            name="Private Entrance"
            onChange={checkboxchecked}
          />
          <GiIndiaGate size={20} />
          <span className="font-semibold">Private Entrance</span>
        </label>
        <label className="flex space-x-2 items-center p-3 border-2 rounded-2xl cursor-pointer">
          <input type="checkbox" name="Pets" checked={Perks.includes('Pets')} onChange={checkboxchecked} />
          <MdPets size={20} />
          <span className="font-semibold">Pets</span>
        </label>
        <label className="flex space-x-2 items-center p-3 border-2 rounded-2xl cursor-pointer">
          <input type="checkbox" name="Game Zone" checked={Perks.includes('Game Zone')} onChange={checkboxchecked} />
          <RiGamepadFill size={20} />
          <span className="font-semibold">Game Zone</span>
        </label>
      </div>
    </div>
  );
};

export default Perkspage;
