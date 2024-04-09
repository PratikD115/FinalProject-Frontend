import { treading } from "../../public/data/data";
import Slider from "react-slick";
import Title from "../common/Title";
import { gql, useQuery } from "@apollo/client";
import ArtistCard from "../common/ArtistCard";


const GET_DATA = gql`
  query {
    getAllActiveArtist{
      id
      name
      imageLink
      dateOfBirth
      nationality
    }
  }
`;

export default function Treading() {
  const { loading, error, data } = useQuery(GET_DATA);

   if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
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
        {data.getAllActiveArtist.map((item, i) => (
          <div className="box card hero m-5" key={i}>
            <div className="mr-5">
              <ArtistCard cover={item.imageLink} name={item.name}  tag={item.tag} />
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
