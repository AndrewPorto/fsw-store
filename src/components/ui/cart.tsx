import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computeProdutTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";
import { ScrollArea } from "./scroll-area";
import { Button } from "./button";
import { createCheckout } from "@/actions/checkout";
import { loadStripe } from "@stripe/stripe-js"
 
const Cart = () => {
  const { products, subtotal, total, totalDiscount } = useContext(CartContext);
  
  const handleFinishPurchesClick = async () => {
    const checkout = await createCheckout(products);

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY
    )

    stripe?.redirectToCheckout({
      sessionId: checkout.id
    })
  }

  return (
    <div className="flex h-full flex-col gap-8">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.365rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>
      <div className="flex h-full flex-col gap-5 overflow-hidden">
        <ScrollArea className="">
          <div className="flex flex-col h-full gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <CartItem
                  product={computeProdutTotalPrice(product as any) as any}
                  key={product.id}
                />
              ))
            ) : (
              <p className="text-center font-semibold">
                Carrinho vazio. Vamos fazer compras?
              </p>
            )}
          </div>
        </ScrollArea>
      </div>
      <div className="flex flex-col gap-3">
        <Separator />
        <div className="flex items-center justify-between text-xs">
          <p>Subtotal</p>
          <p>R$ {subtotal.toFixed(2)}</p>
        </div>

        <Separator />

        <div className="flex items-center justify-between text-xs">
          <p>Entrega</p>
          <p>GRÁTIS</p>
        </div>

        <Separator />

        <div className="flex items-center justify-between text-xs">
          <p>Descontos</p>
          {totalDiscount > 0 ? (
            <p>- R$ {totalDiscount.toFixed(2)}</p>
          ) : (
            <p>R$ 0.00</p>
          )}
        </div>
        <Separator />

        <div className="flex items-center justify-between text-sm font-bold">
          <p>Total</p>
          <p>R$ {total.toFixed(2)}</p>
        </div>
        <Button className="mt-7 font-bold uppercase" onClick={handleFinishPurchesClick}>finalizar compra</Button>
      </div>
    </div>
  );
};

export default Cart;
