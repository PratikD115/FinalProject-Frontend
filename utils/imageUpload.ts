import axios from "axios";
import toast from "react-hot-toast";

export const cloudinaryUpload = async (file: File, path: string, type : string) => {
  let imageLink;
  if (!file) {
    toast.error("No file selected");
    return;
  }

  const upload_preset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;
  const cloud_name = process.env.NEXT_PUBLIC_CLOUD_NAME;

  try {
    const uploadData = new FormData();
    if (upload_preset && cloud_name) {
      uploadData.append("file", file);
      uploadData.append("upload_preset", upload_preset);
      uploadData.append("cloud_name", cloud_name);
      uploadData.append("folder", path);
    }

    const loadingToastId = toast.loading("uploading photo", { duration: 0 });

    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/${type}/upload`,
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
