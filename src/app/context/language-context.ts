'use client'
import { createContext } from "react";
import { dictionaryList, languages } from "../languages";

export const LanguageContext = createContext({
  language: 'pt',
  languages: languages,
  dictionary: dictionaryList.pt,
  changeLanguage: (value: "pt" | "en") => {},
});
