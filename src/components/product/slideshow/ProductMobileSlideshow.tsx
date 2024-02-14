'use client';

import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { ProductImage } from '../product-image/ProductImage';


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';
import { Product } from '../../../interfaces/product.interface';


interface Props {
    images: string[];
    title: string;
    className?: string;
}

export const ProductMobileSlideshow = ({ images, title, className }: Props) => {

    return (
        <div className={className}>
            <Swiper
                style={{
                    width: '100vw',
                    height: '500px',
                } as React.CSSProperties}
                pagination
                autoplay={{
                    delay: 2500
                }}

                modules={[FreeMode, Autoplay, Pagination]}
                className="mySwiper2"
            >
                {images.map(image => (
                    <SwiperSlide key={image}>
                        <ProductImage
                            src={image}
                            width={600}
                            height={500}
                            alt={title}
                            className="object-fill"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    )
}
