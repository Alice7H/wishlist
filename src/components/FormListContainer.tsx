'use client'
import { Wish } from "@/types/Wish";
import {useState } from "react";
import { WishForm } from "./WishForm";
import { WishList } from "./WishList";
import { WishListClearer } from "./WishListClearer";


export function FormListContainer() {
  const [wish, setWish] = useState<Wish>({id: '', title: '', value: 0, status: 'none' });

  return(
    <>
      <WishForm wish={wish} />
      <WishList setWish={setWish} />
      <WishListClearer />
    </>
  )
}