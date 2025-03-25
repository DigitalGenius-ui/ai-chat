"use client";

import { Context } from "@/_context/UserContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { UserButton } from "@stackframe/stack";

export default function Header() {
  const { userData } = useContext(Context);
  const path = usePathname();

  return (
    <header className="shadow-sm">
      <div className="w-[90%] md:w-[85%] lg:w-[80%] mx-auto flex items-center justify-between h-[70px]">
        <Link href="/">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={150}
            height={150}
            style={{ objectFit: "contain", height: "auto", width: "auto" }}
            priority
          />
        </Link>
        {path !== "/" ? (
          <UserButton />
        ) : (
          <Link href={userData ? "/dashboard" : "/handler/sign-up"}>
            <Button variant="blue">Get Started</Button>
          </Link>
        )}
      </div>
    </header>
  );
}
