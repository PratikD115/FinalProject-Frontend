import axios from "axios";
import toast from "react-hot-toast";

export const cloudinaryUpload = async (image: File, path: string) => {
  let imageLink;
  if (!image) {
    toast.error("No file selected");
    return;
  }

  const upload_preset = "musicPlayer";
  const cloud_name = "ddiy656zq";
  try {
    const uploadData = new FormData();
    uploadData.append("file", image);
    uploadData.append("upload_preset", upload_preset);
    uploadData.append("cloud_name", cloud_name);
    uploadData.append("folder", path);

    const loadingToastId = toast.loading("uploading photo", { duration: 0 });

    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      uploadData
    );
    imageLink = data.url;
    toast.dismiss(loadingToastId);
    toast.success("photo uploaded successfully");
    return imageLink;
  } catch {
    toast.error("failed to upload");
  }
};
