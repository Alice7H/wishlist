import { LanguageContext } from './../context/language-context';
import { useContext } from "react";

export function useLanguageContext() {
  return useContext(LanguageContext);
}