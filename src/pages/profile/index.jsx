import { uploadProfile } from "@/Query/userQuery";
import Layout from "@/components/layout/Layout";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadImage] = useMutation(uploadProfile);
  const { user } = useSelector((state) => state.user);
  const {loading, error, data } = useQuery()
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setSelectedImage(file);
  };
  const handleImageUpload = async () => {
    if (!selectedImage) {

      alert("Please select an image first");
      return ;
    }

    try {
      console.log(selectedImage)
      const { data } = await uploadImage({
        variables: {
          image: selectedImage,
          userId: user?.id,
        }
      });
      
      console.log("Image uploaded successfully:", data);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 ... min-h-screen">
      <Layout>
        <div className="flex">
          <div className="w-[30%] border-2 border-gray-500">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleImageUpload} className="text-white">
              Upload Image
            </button>
          </div>
          <div className="w-[70%] border-2 border-gray-500">
            About user and other information like favorite song and playlist
          </div>
        </div>
      </Layout>
    </div>
  );
}
