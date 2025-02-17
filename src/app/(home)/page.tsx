import Categories from "./components/categories";
import { prismaClient } from "@/lib/prisma";
import ProductList from "../../components/ui/product-list";
import SectionTitle from "../../components/ui/section-title";
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
  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });

  return (
    <div className="flex flex-col gap-8 py-8">
      <PromoBanner
        src="/banner-home01.png"
        alt="até 55% de desconto esse mês"
      />
      <div>
        <Categories />
      </div>
      <div>
        <SectionTitle>ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>
      <PromoBanner
        src="/banner-home02.png"
        alt="até 55% de desconto em mouses"
      />
      <div>
        <SectionTitle>teclados</SectionTitle>
        <ProductList products={keyboards} />
      </div>
      <div>
        <PromoBanner
          src="/banner-home03.png"
          alt="até 55% de desconto em mouses"
        />
      </div>
      <div>
        <SectionTitle>mouses</SectionTitle>
        <ProductList products={mouses} />
      </div>
    </div>
  );
}
