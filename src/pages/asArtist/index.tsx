import { useRouter } from "next/router";
import Title from "../../../components/common/Title";
import Header from "../../../components/header/Header";
import singer from "../../../public/images/singer.jpg";
import { TextField, Button, Divider } from "@mui/material";
import Image from "next/image";
import { useRef, useState } from "react";

export default function ArtistHome() {
  const [openForm, setOpenForm] = useState(false);
  function handleJoinUs() {
    setOpenForm((prev) => !prev);
  }
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const selectLanguageRef = useRef<HTMLSelectElement>(null);
  const selectGenresRef = useRef<HTMLSelectElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event : React.FormEvent) => {
    event.preventDefault();
    // Access input values using refs
    console.log("Name:", nameRef.current?.value);
    console.log("Email:", emailRef.current?.value);
    console.log("Message:", messageRef.current?.value);

    // Optionally, you can clear the input fields after submission
     if (nameRef.current) nameRef.current.value = "";
  if (emailRef.current) emailRef.current.value = "";
    if (messageRef.current) messageRef.current.value = "";
  
  };

  function handleDashboard() {
    console.log('change the page.')
    router.push("asArtist/home");
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="flex justify-end items-center  text-white pt-[10vh]">
        <div className="w-[60%] text-center">
          <h1 className="text-4xl font-bold">
            Discover the perfect stage for your melodies
          </h1>
          <p className="text-lg">
            and the captivating resonance of your voice with our curated
            showcase for songs and podcasts.
          </p>
          <div className="mt-4 ">
            <button
              onClick={handleJoinUs}
              className="mr-2 py-3 px-6 bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600"
            >
              Join Us
            </button>
            <button
              onClick={handleDashboard}
              className="py-3 px-6 bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600"
            >
              Dashboard
            </button>
            
          </div>
        </div>
        <div className="w-[35%] flex justify-end mr-10">
          <Image
            src={singer}
            alt="Your Image"
            height={300}
            width={370}
            className="rounded-lg"
          />
        </div>
      </div>
      <Divider className=" bg-white my-5 mx-5"/>
      {openForm && (
        <div className="text-white h-screen px-10">
          <form onSubmit={handleSubmit} className=" p-6 rounded-lg">
            <Title title={"Artist Info"} />
            <div className="grid grid-cols-2 gap-4">
              <div>
                {" "}
                <label htmlFor="name" className="block text-gray-200 text-sm">
                  Please enter the Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  ref={nameRef}
                  className="w-96 h-8 py-5 px-4 mb-2 border border-green-500 bg-gray-900 text-white rounded-md"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-200 text-sm">
                  Please enter the Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  ref={emailRef}
                  className="w-96 h-8 py-5 px-4 mb-2 border border-green-500 bg-gray-900  text-white rounded-md"
                />
              </div>
             
              
               <div>
                 <label htmlFor="selectField" className="block text-gray-200 text-sm">
   Select Your Song Genres
  </label>
  <select
    id="selectField"
    ref={selectGenresRef}
    className="w-96 h-8 py-5 px-4 mb-2 border border-green-500 bg-gray-900  text-white rounded-md"
  >
    <option value="option1">lofi</option>
    <option value="option2">pop</option>
    <option value="option3">hip hop</option>
  </select>
              </div>
               <div>
                 <label htmlFor="selectField" className="block text-gray-200 text-sm">
                  please your prefered song language
                  
  </label>
  <select
    id="selectField"
    ref={selectLanguageRef}
    className="w-96 h-8 py-5 px-4 mb-2 border border-green-500 bg-gray-900  text-white rounded-md"
  >
    <option value="hindi">Hindi</option>
    <option value="english">English</option>
    <option value="punjabi">Punjabi</option>
  </select>
              </div>
              <div>
  <label htmlFor="date" className="block text-gray-200 text-sm">
    Please Select the DateOfBirth
  </label>
  <input
    type="date"
    id="date"
    ref={dateRef}
    className="w-96 h-8 py-5 px-4 mb-2 border border-green-500 bg-gray-900 text-white rounded-md"
  />
</div>
              
              
              <div className="col-span-2">
                <label
                  htmlFor="message"
                  className="block text-gray-200 text-sm"
                >
                  Write about yourself
                </label>
                <textarea
                  id="message"
                  placeholder="Enter your message"
                  rows={4}
                  ref={messageRef}
                  className="w-full h-24 py-5 px-4 mb-2 border border-green-500 bg-gray-900 text-white rounded-md resize-none"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Create New Profile
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
