import { Badge } from "@/components/ui/badge";
import { CATEGORY_ICOM } from "@/constants/category-item";
import { Category } from "@prisma/client";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link href={`/category/${category.slug}`}>
      <Badge
        variant="outline"
        className="mx-5 flex items-center justify-center gap-2 rounded-lg py-3"
      >
        {CATEGORY_ICOM[category.slug as keyof typeof CATEGORY_ICOM]}
        <span className="text-xs font-bold">{category.name}</span>
      </Badge>
    </Link>
  );
};

export default CategoryItem;
