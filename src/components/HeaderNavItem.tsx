interface NavItemProps {
  children: React.ReactNode;
}

export const NavItem: React.FC<NavItemProps> = ({ children }) => {
  return (
    <div className="relative group flex justify-center items-center hover:cursor-pointer">
      <span
        className={`absolute z-10 top-4 -left-1 w-2 h-2  transition-all duration-350 easy-in-out bg-transparent group-hover:bg-green_500 group-active:bg-green_600`}
      ></span>
      {children}
    </div>
  );
};
