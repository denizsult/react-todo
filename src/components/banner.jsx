import mountains from "../assets/images/mountains.png";

export const Banner = () => {
  return (
    <div
      className="w-screen absolute z-[-1] bottom-[440px] h-full bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${mountains})` }}
    ></div>
  );
};
