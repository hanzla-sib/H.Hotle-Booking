import React from 'react'

const AddPhotoLink = ({photolink,setphotolink,upload_by_link}) => {
  return (
    <div className="flex ">
    <input
      value={photolink}
      onChange={(e) => setphotolink(e.target.value)}
      className="w-full md:w-[600px] mt-1 bg-transparent border-2  rounded-2xl px-2 justify-between "
      type="text"
      placeholder="Add image by providing the link"
    />
    <button
      onClick={upload_by_link}
      className="ml-4 bg-gray-300 rounded-full px-8 md:px-4 py-2 border-2"
    >
      Add Photo
    </button>
  </div>
  )
}

export default AddPhotoLink
