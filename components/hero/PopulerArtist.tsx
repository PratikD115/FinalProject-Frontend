import Slider from "react-slick";
import Title from "../common/Title";
import ArtistCard from "../common/ArtistCard";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GET_DATA } from "../../Query/artistQuery";


const PopulerArtist: React.FC = () => {
  const { loading, error, data } = useQuery(GET_DATA);
  const [artistInfo, setArtistInfo] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (data) {
      const { getAllActiveArtist } = data;
      setArtistInfo(getAllActiveArtist);
    }
  });

  const handleClick = (id: string) => {
    router.push(`/artist/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
        {data.getAllActiveArtist.map((item: any, index: number) => (
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
