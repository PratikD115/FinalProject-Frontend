import img from "../../public/images/b4.jpg";
import Image from "next/image";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Slider from "@mui/material/Slider";
import PauseIcon from "@mui/icons-material/Pause";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import { useState, useEffect, useRef } from "react";
import { gql, useQuery } from "@apollo/client";

const SONGS = gql`
  query {
    getAllActiveSongs(page: 1, limit: 10) {
      id
      title
      artist {
        id
        name
      }
      streamingLink
      imageLink
      mood
    }
  }
`;
export default function Player() {
  const { loading, error, data } = useQuery(SONGS);
  const audioPlayer = useRef();
  const [index, setIndex] = useState(0);
  const [volume, setVolume] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mute, setMute] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playlist, setPlaylist] = useState([]);
  const [currentSong, setCurrentSong] = useState("");

  let songs;
  useEffect(() => {
    if (data) {
      const { getAllActiveSongs } = data;
      // songs = getAllActiveSongs.map((songObject) => {
      //   return songObject.streamingLink;
      // });

      setPlaylist(getAllActiveSongs);
      setCurrentSong(getAllActiveSongs[0]);
    }
  }, [data]);
  // const  currentSong=
  //   "https://res.cloudinary.com/ddiy656zq/video/upload/v1712306854/song-audio/ionyx2fcxvfzkcvzq5il.mp3"

  useEffect(() => {
    if (audioPlayer.current) {
      audioPlayer.current.volume = volume / 100;
    }
    if (isPlaying) {
      setInterval(() => {
        const _duration = Math.floor(audioPlayer?.current?.duration);
        const _elapsed = Math.floor(audioPlayer?.current?.currentTime);
        setDuration(_duration);
        setElapsed(_elapsed);
      }, 100);
    }
  }, [volume, isPlaying]);

  function formatTime(time) {
    if (time && !isNaN(time)) {
      const minutes =
        Math.floor(time / 60) < 10
          ? `0${Math.floor(time / 60)}`
          : Math.floor(time / 60);
      const seconds =
        Math.floor(time % 60) < 10
          ? `0${Math.floor(time % 60)}`
          : Math.floor(time % 60);
      return `${minutes}:${seconds}`;
    }
    return "00:00";
  }

  function toggleForward() {
    audioPlayer.current.currentTime += 10;
  }

  function toggleBackward() {
    audioPlayer.current.currentTime -= 10;
  }

  function toggleSkipForward() {
    if (index >= playlist.length - 1) {
      setIndex(0);
      audioPlayer.current.src = playlist[0].streamingLink;
      audioPlayer.current.play();
    } else {
      setIndex((prev) => prev + 1);
      audioPlayer.current.src = playlist[index + 1].streamingLink;
      audioPlayer.current.play();
    }
  }

  function toggleSkipBackward() {
    if (index > 0) {
      setIndex((prev) => prev - 1);
      audioPlayer.current.src = playlist[index - 1].streamingLink;
      audioPlayer.current.play();
    }
  }

  function VolumeBtns() {
    return mute ? (
      <VolumeOffIcon
        className="text-gray-400 hover:text-gray-200 mr-2"
        onClick={() => setMute(!mute)}
      />
    ) : volume <= 20 ? (
      <VolumeMuteIcon
        className="text-gray-400 hover:text-gray-200 mr-2"
        onClick={() => setMute(!mute)}
      />
    ) : volume <= 75 ? (
      <VolumeDownIcon
        className="text-gray-400 hover:text-gray-200 mr-2"
        onClick={() => setMute(!mute)}
      />
    ) : (
      <VolumeUpIcon
        className="text-gray-400 hover:text-gray-200 mr-2"
        onClick={() => setMute(!mute)}
      />
    );
  }

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
    if (isPlaying) {
      audioPlayer.current.pause();
    } else {
      audioPlayer.current.play();
    }
  };

  return (
    <div className="bg-gray-700 fixed bottom-0 w-full h-[17vh] text-white">
      <audio src={currentSong.streamingLink} ref={audioPlayer} muted={mute} />
      <Slider
        value={elapsed}
        max={duration}
        size="small"
        className="w-[95vw] mx-6 text-green-500 py-2 mt-1  mr-5"
      />

      <div className=" pb-1">
        <div className="mx-3 flex justify-between h-full md:justify-between items-center">
          <div className="flex  w-60 ml-5">
            <Image
              height={100}
              width={100}
              src={playlist[index]?.imageLink}
              alt="img"
              className="h-16 w-16 rounded-md border-2 border-gray-400 mr-5"
            />

            <div className="text mt-2">
              <h3 className="text-base text-gray-400 font-semibold">
                {playlist[index]?.title}
              </h3>
              <span className="text-gray-500 text-sm">
                {playlist[index]?.artist?.name}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <SkipPreviousIcon
              className="text-gray-400 hover:text-gray-200 mr-5"
              onClick={toggleSkipBackward}
            />
            <FastRewindIcon
              className="text-gray-400 hover:text-gray-200"
              onClick={toggleBackward}
            />
            {isPlaying ? (
              <PauseIcon
                onClick={togglePlay}
                fontSize="large"
                className="text-primary hover:text-green-500 mx-5"
              />
            ) : (
              <PlayArrowIcon
                onClick={togglePlay}
                fontSize="large"
                className="text-primary  hover:text-green-500 mx-5"
              />
            )}

            <FastForwardIcon
              className="text-gray-400 hover:text-gray-200"
              onClick={toggleForward}
            />

            <SkipNextIcon
              className="text-gray-400 hover:text-gray-200 ml-5"
              onClick={toggleSkipForward}
            />
          </div>
          <div className="ml-10">
            <div className="pl-20">
              <p className="text-gray-400 text-sm">
                {formatTime(elapsed)} / {formatTime(duration)}
              </p>
            </div>

            <div className="flex items-center justify-start w-48 pl-10 pt-2">
              <VolumeBtns />
              <Slider
                min={0}
                max={100}
                value={volume}
                onChange={(e, v) => setVolume(v)}
                aria-label="Small"
                size="small"
                className="w-20 text-green-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
