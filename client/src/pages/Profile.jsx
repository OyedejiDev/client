import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import axios from "axios";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user); 

  

  const [uploadProgress, setUploadProgress] = useState(null);
  const [imageUrl, setImageUrl] = useState(currentUser.avatar);
  const [uploadMessage, setUploadMessage] = useState(null); // ✅ success/error msg
  const [uploadError, setUploadError] = useState(false); // ✅ toggle color

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
    setUploadMessage("Only image files are allowed.");
    setUploadError(true);
    return;
  }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "realestate"); 

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/ds8leyo2h/image/upload`,
        formData,
        {
          onUploadProgress: (e) => {
            const percent = Math.round((e.loaded * 100) / e.total);
            setUploadProgress(percent);
          },
        }
      );

      setImageUrl(res.data.secure_url);
      setUploadProgress(null); 
      setUploadMessage("Image successfully uploaded!");
      setUploadError(false);
    } catch (err) {
      console.error("Upload failed:", err.message);
      setUploadProgress(null);
      setUploadMessage("Image upload error");
      setUploadError(true);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className="flex flex-col gap-4">
        <input 
        type="file" 
        ref={fileRef} 
        hidden 
        accept="image/*"
        onChange={handleFileChange}
        />
        <img 
        onClick={()=>fileRef.current.click()} 
        src= {imageUrl} 
        alt="profile" 
        className="rounded-full h-24 w-24 object-cover cursor-pointer self-center" 
        />

        {uploadMessage && (
          <p
            className={`text-center text-sm ${
              uploadError ? "text-red-700" : "text-green-700"
            }`}
          >
            {uploadMessage}
          </p>
        )}

        {uploadProgress !== null && (
          <p className="text-center text-sm text-gray-700">
            Uploading: {uploadProgress}%
          </p>
        )}

        <input type="text" placeholder="username" id="username" className="border p-3 rounded-lg"/>
    
        <input type="email" placeholder="email" id="email" className="border p-3 rounded-lg"/>
      
        <input type="text" placeholder="password" id="password" className="border p-3 rounded-lg"/>
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 cursor-pointer">Update</button>
      </form>

      <div className="flex justify-between">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>


    </div>
  )
}
