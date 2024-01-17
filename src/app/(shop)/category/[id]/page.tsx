import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  }
}

const products = initialData.products;


export default function CategoryPage({ params }: Props) {

  const { id } = params;

  /* if (id === 'kids') {
    notFound();
  } */
  const productsInCategory = products.filter(product => product.gender === id);

  return (
    <>

      <Title
        title={`${id}`}
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid products={productsInCategory} />

    </>
  );
}