import Image from "next/image";
import TextHeading from "../components/Text";

interface HomeTileProps {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  className?: string;
}

const HomeTile: React.FC<HomeTileProps> = ({
  src,
  alt,
  title = '',
  description = '',
  className = '',
}) => {
  return (
    <div className={`bg-white shadow-lg !rounded-lg ${className}`}>
      <div className='clip-path-home-tile w-full h-[270px] sm:h-[370px]'>
        <Image src={src} fill alt={alt} className="w-full object-center object-cover !relative rounded-t-lg" />
      </div>
      <div className='p-8 pb-14'>
        <TextHeading className="text-brand-orange mb-4" type="heading" style="text-heading-2" text={title} />
        <p className="mt-2 text-brand-blue font-sans">{description}</p>
      </div>
    </div>
  );
};

export default HomeTile;
