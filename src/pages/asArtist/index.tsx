import { useRouter } from "next/router";
import Title from "../../../components/common/Title";
import Header from "../../../components/header/Header";
import singer from "../../../public/images/singer.jpg";
import { Divider } from "@mui/material";
import Image from "next/image";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { isSubscriptionValid } from "../../../utils/subscriptions";
import { gql, useMutation } from "@apollo/client";
import { userToArtist } from "../../../Query/artistQuery";
import { Genres, Language } from "../../../Query/enum";
import { userActions } from "../../../store/userSlice";
import { RootState } from "../../../store";

const ArtistHome = () => {
  const [openForm, setOpenForm] = useState(false);
  const [addUserToArtist] = useMutation(userToArtist);
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const selectLanguageRef = useRef<HTMLSelectElement>(null);
  const selectGenresRef = useRef<HTMLSelectElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const { profile } = useSelector((state: RootState) => state.user);
  const { asArtist } = useSelector((state: RootState) => state.user);
  const { subscribe } = useSelector((state: RootState) => state.user);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Access input values using refs

    if (!selectGenresRef.current?.value) {
      toast.error("which type of song are you prefered");
      return;
    }
    if (!selectLanguageRef.current?.value) {
      toast.error("Please let us know your prefered song langauge");
      return;
    }
    if (!dateRef.current?.value) {
      toast.error("Please enter your birth data");
      return;
    }
    if (!messageRef.current?.value) {
      toast.error("Please tell me about your self");
      return;
    }
    try {
      let genresArray = [];
      genresArray.push(selectGenresRef.current.value);

      const { data } = await addUserToArtist({
        variables: {
          name: user?.name,
          userId: user?.id,
          dateOfBirth: dateRef.current.value.toString(),
          genres: genresArray,
          language: selectLanguageRef.current.value,
          biography: messageRef.current.value,
          imageLink: profile,
        },
      });

      if (messageRef.current) messageRef.current.value = "";
      if (dateRef.current) dateRef.current.value = "";
      if (selectGenresRef.current) selectGenresRef.current.value = "";
      if (selectLanguageRef.current) selectLanguageRef.current.value = "";
      if (data) {
        toast.success("artist Profile create suceessfully");
        dispatch(
          userActions.asArtist({ artistId: data.createUserToArtist.id })
        );

        router.push("/asArtist/home");
      }
    } catch {
      toast.error("failed to create artist profile ");
    }
  };

  const handleDashboard = () => {
  
    if (subscribe && isSubscriptionValid(subscribe)) {
      if (asArtist) {
        router.push("asArtist/home");
      } else {
        toast("Please enter the all the details as artist ");
        setOpenForm(true);
      }
    } else {
      toast.error("Join as a premium user to use asArtist");

      router.push("/subscription");
    }
  };
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="flex justify-end items-center  text-white pt-[8vh]">
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
      <Divider className=" bg-white my-5 mx-5" />
      {openForm && (
        <div className="text-white h-screen px-10">
          <form onSubmit={handleSubmit} className=" p-6 rounded-lg">
            <Title title={"Artist Info"} />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-gray-200 text-sm">
                  Please enter the Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  ref={nameRef}
                  value={user?.name}
                  disabled
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
                  value={user?.email}
                  disabled
                  className="w-96 h-8 py-5 px-4 mb-2 border border-green-500 bg-gray-900  text-white rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="selectField"
                  className="block text-gray-200 text-sm"
                >
                  Select Your Song Genres
                </label>
                <select
                  id="selectField"
                  ref={selectGenresRef}
                  className="w-96 h-8 py-5 px-4 mb-2 border border-green-500 bg-gray-900  text-white rounded-md"
                >
                  {Genres.map((item, index) => (
                    <option value={`${item}`}>{item}</option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="selectField"
                  className="block text-gray-200 text-sm"
                >
                  please your prefered song language
                </label>
                <select
                  id="selectField"
                  ref={selectLanguageRef}
                  className="w-96 h-8 py-5 px-4 mb-2 border border-green-500 bg-gray-900  text-white rounded-md"
                >
                  {Language.map((item, index) => (
                    <option value={`${item}`}>{item}</option>
                  ))}
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
};

export default ArtistHome;
