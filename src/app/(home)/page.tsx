import Image from "next/image";
import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "./components/product-list";
import SectionTitle from "./components/section-title";
import PromoBanner from "./components/promo-banner";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  return (
    <div className="">
      <PromoBanner
        src="/banner-home01.png"
        alt="até 55% de desconto esse mês"
      />
      <div className="mt-8">
        <Categories />
      </div>
      <div className="mt-8">
        <SectionTitle>ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>
      <PromoBanner
        src="/banner-home02.png"
        alt="até 55% de desconto em mouses"
      />
      <div className="mt-8">
        <SectionTitle>teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>
    </div>
  );
}
