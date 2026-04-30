"use client";

import Lottie from "lottie-react";
import notFound from "../../public/animation/notFound.json";

export const NotFoundAnime: React.FC = () => {
  return (
    <Lottie animationData={notFound} loop={false} autoplay={true} width={"100px"} height={"100px"} />
  );
};
