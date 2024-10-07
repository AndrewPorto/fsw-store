import Image from "next/image";
import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "./components/product-list";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });
  return (
    <div className="">
      <Image
        src="/banner-home01.png"
        width={0}
        height={0}
        alt="até 55% de desconto esse mês"
        className="h-auto w-full"
        sizes="100vw"
      />
      <div className="mt-8">
        <Categories />
      </div>
      <div className="mt-8">
        <p className="mb-3 pl-5 font-bold uppercase">Ofertas</p>
        <ProductList products={deals} />
      </div>
      <Image
        src="/banner-home02.png"
        width={0}
        height={0}
        alt="até 55% de desconto em mouses"
        className="h-auto w-full"
        sizes="100vw"
      />
    </div>
  );
}
