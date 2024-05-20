import Image from "next/image";
import songImage from "../../public/images/songImage.png";
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
import { useState, useEffect, useRef, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playlistActions } from "../../store/playlistSlice";
import { useRouter } from "next/router";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Link from "next/link";
import toast from "react-hot-toast";
import { RootState } from "../../store";

interface SliderProps {
  value: number;
  max: number;
  onChange: (event: Event) => void; // Define the type for onChange
  size: string;
  className: string;
}

const Player = () => {
  const { playlist } = useSelector((state: RootState) => state.playlist);
  const { index } = useSelector((state: RootState) => state.playlist);
  const audioPlayer: any = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mute, setMute] = useState(false);
  const [elapsed, setElapsed] = useState<number>(0);
  const [duration, setDuration] = useState(0);
  const currentSong = playlist?.[index];
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    console.log("working volume");
    if (audioPlayer.current) {
      audioPlayer.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        const _duration = Math.floor(audioPlayer.current?.duration);
        const _elapsed = Math.floor(audioPlayer.current?.currentTime);
        setDuration(_duration);
        setElapsed(_elapsed);
        if (_duration === _elapsed) {
          toggleSkipForward();
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (currentSong) {
      audioPlayer.current?.play();
      setIsPlaying(true);
    }
  }, [index]);

  const handleSliderChange = (event: any, newValue: any) => {
    setElapsed(newValue);
    if (newValue) {
      audioPlayer.current.currentTime = newValue;
    }
  };
  const formatTime = (time: number) => {
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
  };

  const toggleForward = () => {
    audioPlayer.current.currentTime += 10;
  };

  const toggleBackward = () => {
    audioPlayer.current.currentTime -= 10;
  };

  const toggleSkipForward = () => {
    if (index >= playlist.length - 1) {
      dispatch(playlistActions.nextSong(0));
      audioPlayer.current.src = playlist[index]?.streamingLink;
      audioPlayer.current?.play();
    } else {
      // setIndex((prev) => prev + 1);
      dispatch(playlistActions.nextSong(index + 1));
      audioPlayer.current.src = playlist[index + 1].streamingLink;
      if (!isPlaying) {
        togglePlay();
      }
      audioPlayer.current?.play();
    }
  };

  const toggleSkipBackward = () => {
    if (index > 0) {
      dispatch(playlistActions.nextSong(index - 1));
      audioPlayer.current.src = playlist[index].streamingLink;
      if (!isPlaying) {
        togglePlay();
      }
      audioPlayer.current.play();
    }
  };

  const VolumeBtns = () => {
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
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
    if (isPlaying) {
      audioPlayer.current.pause();
    } else {
      audioPlayer.current.play();
    }
  };

  const handleviewMore = () => {
    if (currentSong) {
      router.push("/queue");
    } else {
      toast.error("please select the playlist");
    }
  };

  return (
    <div className="z-10 bg-gray-700 fixed bottom-0 w-full h-[17vh] text-white ">
      <audio
        src={currentSong?.streamingLink}
        autoPlay
        ref={audioPlayer}
        muted={mute}
      />
      <Slider
        value={elapsed}
        max={duration | 0}
        onChange={handleSliderChange}
        size="small"
        className="w-[95vw] mx-6 text-green-500 py-2 mt-1  mr-5"
      />

      <div className=" pb-1">
        <div className="mx-3 flex justify-between md:justify-between items-center h-full">
          <div className="flex items-center">
            <div className="cursor-pointer" onClick={handleviewMore}>
              <MoreVertIcon />
            </div>
            <Image
              height={100}
              width={100}
              src={currentSong ? currentSong.imageLink : songImage}
              alt="img"
              className="h-16 w-16 rounded-md border-2 border-gray-400 mr-5"
            />

            <div className="text h-auto w-44 overflow-hidden">
              <h3 className="text-base text-gray-400 font-semibold">
                {playlist[index]?.title}
              </h3>
              <span className="text-gray-500 text-sm overflow-x-hidden">
                {playlist[index]?.artist?.name}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <SkipPreviousIcon
              className="text-gray-400 hover:text-gray-200 mr-5 cursor-pointer"
              onClick={toggleSkipBackward}
            />
            <FastRewindIcon
              className="text-gray-400 hover:text-gray-200 cursor-pointer"
              onClick={toggleBackward}
            />
            {isPlaying ? (
              <PauseIcon
                onClick={togglePlay}
                fontSize="large"
                className="text-primary hover:text-green-500 mx-5 cursor-pointer"
              />
            ) : (
              <PlayArrowIcon
                onClick={togglePlay}
                fontSize="large"
                className="text-primary  hover:text-green-500 mx-5 cursor-pointer"
              />
            )}

            <FastForwardIcon
              className="text-gray-400 hover:text-gray-200 cursor-pointer"
              onClick={toggleForward}
            />

            <SkipNextIcon
              className="text-gray-400 hover:text-gray-200 ml-5 cursor-pointer"
              onClick={toggleSkipForward}
            />
          </div>
          <div className="ml-10">
            <div className="pl-20">
              <p className="text-gray-400 text-sm">
                {formatTime(elapsed)} / {formatTime(duration)}
              </p>
            </div>

            <div className="flex items-center justify-start w-48 pl-10 pt-2 cursor-pointer">
              <VolumeBtns />
              <Slider
                min={0}
                max={100}
                value={volume}
                onChange={(e, v: any) => setVolume(v)}
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
};

export default Player;
