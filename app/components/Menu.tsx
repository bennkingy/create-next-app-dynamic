"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  label: string;
  href: string;
  divider?: boolean;
  newTab?: boolean;
}

interface MenuProps {
  menuItems: MenuItem[];
  orientation?: "horizontal" | "vertical";
  className?: string;
  center?: boolean;
}

const Menu: React.FC<MenuProps> = ({
  menuItems,
  orientation = "horizontal",
  className = "",
  center = false,
}) => {
  const isHorizontal = orientation === "horizontal";
  const pathname = usePathname();

  return (
    <nav
      className={`flex ${isHorizontal ? "flex-row space-x-4" : "flex-col space-y-4"
        } bg-white ${center ? "justify-center items-center" : ""} ${className}`}
    >
      {menuItems.map((item) => (
        <div
          key={item.href}
          className={`relative group flex items-center ${item.divider ? (isHorizontal ? "pr-8" : "pb-4") : ""
            }`}
        >
          <Link
            href={item.href}
            className="relative"
            target={item.newTab ? "_blank" : undefined}
            rel={item.newTab ? "noopener noreferrer" : undefined}
          >
            <span
              className={`inline-block text-gray-800 font-semibold !font-openSans capitalize ${pathname === item.href
                ? "text-gray-800 "
                : "hover:text-gray-800 "
                }`}
            >
              <span className=" font-Opensans font-bold text-[18px] sm:text-[20px]">
                {item.label}
              </span>
            </span>
            {/* Orange SVG underline */}
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-orange-500 transition-all duration-300 ${pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                }`}
            />
          </Link>
          {item.divider && isHorizontal && (
            <div className="border-r border-gray-300 h-4 sm:h-5 mx-2 absolute right-0 bottom-[5px] sm:bottom-[7px]" />
          )}
          {item.divider && !isHorizontal && (
            <div className="border-b border-gray-300 w-full my-2" />
          )}
        </div>
      ))}
    </nav>
  );
};

export default Menu;