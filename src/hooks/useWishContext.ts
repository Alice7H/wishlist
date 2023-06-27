import { WishContext } from "@/context/wish-context";
import { useContext } from "react";

export function useWishContext() {
  return useContext(WishContext);
}