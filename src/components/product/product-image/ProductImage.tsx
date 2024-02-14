import Image from 'next/image';

interface Props {
    src?: string;
    alt: string;
    className?: React.StyleHTMLAttributes<HTMLImageElement>['className'];
    width: number;
    height: number;
}

export const ProductImage = ({ src, alt, className, width, height }: Props) => {
    console.log({src})
    
    const localSrc = (src)
        ? src.startsWith('http') ? src : `/products/${src}`
        : '/imgs/placeholder.jpg';
        ///imgs/starman_750x750.png

    return (
        <Image
            src={localSrc}
            width={width}
            height={height}
            alt={alt}
            className={className}
        />
    )
}
