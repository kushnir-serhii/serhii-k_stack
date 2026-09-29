import Link from "next/link";

interface MainLogoProps {
  classNameShortLogo?: string;
  classNameLogo?: string;
  classNameLink?: string;
}

export const MainLogo: React.FC<MainLogoProps> = ({
  classNameLogo,
  classNameLink,
  classNameShortLogo,
}) => {
  return (
    <Link
      href="/"
      aria-label="Link to home page"
      className={`buttonOrLink flex my-auto ${classNameLink}`}
    >
      <span className="font-bold leading-5 mr-auto">
        <span
          className={`${
            classNameShortLogo ? classNameShortLogo : "hidden"
          } flex text-lg text-black_900`}
        >
          &lt;SK&gt;
        </span>
        <span className={` ${classNameLogo}`}>
          {"<SerhiiKushnir />"}
        </span>
      </span>
    </Link>
  );
};
