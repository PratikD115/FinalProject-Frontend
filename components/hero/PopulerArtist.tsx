import Slider from "react-slick";
import Title from "../common/Title";
import ArtistCard from "../common/ArtistCard";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ArtistInfo } from "../../Query/artistQuery";
import { ArtistState } from "../../interface";

const PopulerArtist: React.FC = () => {
 const { data } = useQuery(ArtistInfo);
  const [artistInfo, setArtistInfo] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (data) {
      const { getAllActiveArtist } = data;
      setArtistInfo(getAllActiveArtist);
    }
  }, [data]);

  const handleClick = (id: string) => {
    router.push(`/artist/${id}`);
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="treading hero">
      <Title title="Popular Artist" />
      <Slider {...settings}>
        {artistInfo.map((item: ArtistState, index: number) => (
          <div className="box card hero m-5" key={index}>
            <div className="mr-5">
              <ArtistCard
                onClick={() => handleClick(item.id)}
                artistImage={item.imageLink}
                artistName={item.name}
              />
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default PopulerArtist;
