import { Product } from "@prisma/client";

export interface ProductWithTotalPrice extends Product {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  imageUrls: any;
  totalPrice: number;
}
export const computeProdutTotalPrice = (
  product: Product,
): ProductWithTotalPrice => {
  if (product.discountPercentage === 0) {
    return {
      ...product,
      totalPrice: Number(product.basePrice),
    };
  }

  const totalDiscount =
    Number(product.basePrice) * (product.discountPercentage / 100);

  return {
    ...product,
    totalPrice: Number(product.basePrice) - totalDiscount,
  };
};
