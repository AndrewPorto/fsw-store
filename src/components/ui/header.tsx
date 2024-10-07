"use client";

import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  MenuIcon,
  PercentIcon,
  ShoppingCartIcon,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./sheet";
import { signIn } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const handleLoginClick = async () => {
    await signIn();
  };

  return (
    <Card className="flex items-center justify-between p-[1.875rem]">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant={"outline"}>
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="text-left text-lg font-semibold">
            Menu
          </SheetHeader>
          <div className="mt-2 flex flex-col gap-2">
            <Button
              variant="outline"
              onClick={handleLoginClick}
              className="w-full justify-start gap-2"
            >
              <LogInIcon size={16} /> Fazer Login
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <HomeIcon size={16} /> Inicio
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2">
              <PercentIcon size={16} /> Ofertas
            </Button>
            <SheetClose asChild>
              <Link href="/catalog">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <ListOrderedIcon size={16} /> Catálogo
                </Button>
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
      <Link href="/">
      <h1 className="text-lg font-semibold">
        <span className="text-primary">FSW</span> Store
      </h1>
      </Link>
      <Button size="icon" variant={"outline"}>
        <ShoppingCartIcon />
      </Button>
    </Card>
  );
};

export default Header;
