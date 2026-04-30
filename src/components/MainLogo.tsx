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
  console.log("children", "CHECK HOMANY TIMES");

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
          } flex text-lg text-textDark`}
        >
          &lt;SK&gt;
        </span>
        <span aria-labelledby="main logo" className={` ${classNameLogo}`}>
          {"<SerhiiKushnir />"}
        </span>
      </span>
    </Link>
  );
};
