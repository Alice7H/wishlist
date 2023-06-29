import { WishContext, WishDispatchContext } from "@/context/wish-context";
import { useContext } from "react";

export function useWishContext() {
  return useContext(WishContext);
}

export function useWishDispatch() {
  return useContext(WishDispatchContext);
}