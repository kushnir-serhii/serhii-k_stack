import React from "react";

interface IconProps {
  id: string;
  width?: number;
  height?: number;
  className?: string;
  /** When provided, the icon is treated as meaningful and announced with this label. */
  title?: string;
}

export const Icon: React.FC<IconProps> = ({
  id,
  width = 24,
  height = 24,
  className,
  title,
}) => {

  return (
    <svg
      width={width}
      height={height}
      {...(title
        ? { role: "img", "aria-label": title }
        : { "aria-hidden": "true", focusable: "false" })}
      className={` transition-all ease-in-out ${className}`}
    >
      <use xlinkHref={`/icons/sprite.svg#${id}`} />
    </svg>
  );
};
