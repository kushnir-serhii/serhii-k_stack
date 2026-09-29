"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "./ui/Icon";
import { HeaderNavMenu } from "./HeaderNavMenu";
import { HeaderNavMenuMobile } from "./HeaderNavMenuMobile";
import { MainLogo } from "./MainLogo";

export const Header: React.FC = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const mobileNavId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => setIsShowMenu(false);

    useEffect(() => {
      if (isShowMenu) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
      return () => document.body.classList.remove("overflow-hidden");
    }, [isShowMenu]);

  const wasShowMenuRef = useRef(isShowMenu);
  useEffect(() => {
    const wasShowMenu = wasShowMenuRef.current;
    wasShowMenuRef.current = isShowMenu;

    if (isShowMenu) {
      closeButtonRef.current?.focus();
    } else if (wasShowMenu) {
      // Only reclaim focus when the menu just closed, not on initial mount.
      menuButtonRef.current?.focus();
    }
  }, [isShowMenu]);

  useEffect(() => {
    if (!isShowMenu) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isShowMenu]);

  return (
    <>
      <header className="sticky top-0 z-50 flex justify-between items-center bg-bg/50 backdrop-blur-md w-full h-16">
        <div className="container flex justify-between items-center flex-row mx-auto py-5">
          <MainLogo
            classNameLogo="hidden md:flex text-black_900"
            classNameShortLogo="md:hidden"
            classNameLink="focus-ring rounded-md"
          />
          <button
            ref={menuButtonRef}
            type="button"
            aria-label="Mobile menu button"
            aria-expanded={isShowMenu}
            aria-controls={mobileNavId}
            onClick={() => setIsShowMenu(!isShowMenu)}
            className="flex size-11 -mr-2.5 items-center justify-center md:hidden rounded-full focus-ring"
          >
            <Icon
              id="icon-mobile_menu"
              width={24}
              height={24}
              className="text-black_900"
            />
          </button>
          <div
            id={mobileNavId}
            inert={!isShowMenu}
            aria-hidden={!isShowMenu}
            className={`absolute z-30 left-0 w-full transition-all duration-500 ease-in-out md:hidden
            ${isShowMenu ? "top-0" : "-top-[600px]"}
            `}
          >
            <HeaderNavMenuMobile onClose={closeMenu} closeButtonRef={closeButtonRef} />
          </div>
          <HeaderNavMenu />
        </div>
      </header>
      {isShowMenu && (
        <div
          onClick={closeMenu}
          className={`fixed inset-0 z-20 w-lvw h-lvh transition-all duration-1000 ease-in-out bg-bg/50 backdrop-blur-md
        `}
        />
      )}
    </>
  );
}
