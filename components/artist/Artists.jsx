import { browse } from "../../public/data/data";
import Image from "next/image";

export default function Artists() {
  return (
    <div>
      <section className="sm:mt-20">
        <h1 className="text-5xl font-bold mb-5 text-primary">Artists</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:grid-cols-1">
          {browse.map((item, i) => (
            <div className="box card text-center" key={i}>
              <div className="img relative h-52 w-52 m-auto">
                <Image
                  src={item.cover}
                  alt="cover"
                  width={208}
                  height={208}
                  objectFit="cover"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="text-center">
                <h3 className="text-md text-gray-500 font-semibold">
                  {item.name}
                </h3>
                <span className="text-gray-400">{item.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
