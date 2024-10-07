import { Badge } from "@/components/ui/badge";
import ProductItem from "@/components/ui/product-item";
import { CATEGORY_ICOM } from "@/constants/category-item";
import { computeProdutTotalPrice } from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CategoryProducts = async ({ params }: any) => {
  const category = await prismaClient.category.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      products: true,
    },
  });

  if (!category) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8 p-5">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.365rem] text-base uppercase"
        variant="outline"
      >
        {CATEGORY_ICOM[params.slug as keyof typeof CATEGORY_ICOM]}
        {category.name}
      </Badge>
      <div className="grid grid-cols-2 gap-8">
        {category.products.map((product) => (
          <ProductItem
            product={computeProdutTotalPrice(product)}
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
