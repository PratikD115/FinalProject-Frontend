import Slider from "react-slick";
import Title from "../common/Title";
import ArtistCard from "../common/ArtistCard";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GET_DATA } from "../../Query/artistQuery";

export default function PopulerArtist() {
  const { loading, error, data } = useQuery(GET_DATA);
  const [artistInfo, setArtistInfo] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (data) {
      const { getAllActiveArtist } = data;
      setArtistInfo(getAllActiveArtist);
    }
  });

  function handleClick(id) {
    router.push(`/artist/${id}`);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="treading hero">
      <Title title="Popular Artist" />
      <Slider {...settings}>
        {data.getAllActiveArtist.map((item, index) => (
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
}
