import Image from "next/image";

interface DividerProps {
  color: "orange" | "blue" | "white" | "green" | "black";
  className?: string;
}

export default function Divider({ color = 'orange', className = "" }: DividerProps) {
  const getPath = () => {
    return `/dividers/${color}.svg`;
  };

  const getMobilePath = () => {
    return `/dividers/${color}-mobile.svg`;
  };

  return (
    <div className={`relative w-full overflow-hidden`}>
      <div className={`relative w-full ${color === 'blue' ? 'scale-x-[1.01] origin-center' : ''}`}>
        {/* Desktop divider */}
        <Image
          src={getPath()}
          alt={`${color} divider`}
          width={1920}
          height={100}
          className={`w-full h-auto hidden md:block ${className}`}
        />
        {/* Mobile divider */}
        <Image
          src={getMobilePath()}
          width={390}
          height={100}
          alt={`${color} mobile divider`}
          className={`w-full h-auto block md:hidden ${className}`}
        />
      </div>
    </div>
  );
} 