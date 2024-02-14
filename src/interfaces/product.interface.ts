export interface Product {
    id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: Size[];
    slug: string;
    tags: string[];
    title: string;
    //type: ValidTypes;
    gender: 'men' | 'women' | 'kid' | 'unisex'
}

export interface CartProduct {
    id: string;
    slug: string;
    title: string;
    price: number;
    size: Size;
    quantity: number;
    image: string;
}

export interface ProductImage {
    id: number;
    url: string;
    productId: string;
}

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type ValidTypes = 'shirts' | 'pants' | 'hoodies' | 'hats';