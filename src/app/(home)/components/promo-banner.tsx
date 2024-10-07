import Image,{ ImageProps } from "next/image";

const PromoBanner = ({alt, ...props}: ImageProps) => {
    return ( <Image
        width={0}
        height={0}
        alt={alt}
        className="h-auto w-full"
        sizes="100vw"
        {...props}
      /> );
}
 
export default PromoBanner;