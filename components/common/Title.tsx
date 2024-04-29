import React from "react";

interface TitleProps {
  title: string;
}

const Title: React.FC<TitleProps> = ({ title }: TitleProps) => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-3 font-[lato] text-green-500">
        {title}
      </h1>
    </>
  );
};

export default Title;
