import Image from 'next/image';

interface CustomImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  backgroundSize?: 'cover' | 'contain' | 'auto';
  layout?: 'fixed' | 'intrinsic' | 'responsive' | 'fill';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  className?: string;
  rounded?: boolean;
  style?: React.CSSProperties;
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt = 'Bera Horses',
  width,
  height,
  backgroundSize = 'cover',
  layout = 'instrinsic',
  objectFit = '',
  className = '',
  rounded = false,
  style = {},
}) => {
  return (
    <div
      className={`relative ${className}`}
      style={{
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        backgroundSize,
        ...style,
      }}
    >
      <Image
        src={src}
        height={height}
        width={width}
        alt={alt}
        layout={objectFit ? 'repsonsive' : layout}
        objectFit={objectFit}
        className={[rounded ? "rounded-md" : "", objectFit === 'cover' ? "object-cover" : "", 'h-full'].join(' ')}
      />
    </div>
  );
};

export default CustomImage;
