'use client'
import { dictionaryList, languages } from './../languages';
import {ReactNode, useMemo, useState } from "react";
import { LanguageContext } from './language-context';

type DictionaryType = keyof typeof dictionaryList;

export default function LanguageProvider({children}: { children: ReactNode }) {
  const defaultLanguage = "pt";
  const [selectedLanguage, setSelectedLanguages] = useState<DictionaryType>(defaultLanguage);

  const changeLanguage = (value: DictionaryType) => setSelectedLanguages(value);

  const provider = useMemo(() => ({
    language: selectedLanguage,
    languages: languages,
    dictionary: dictionaryList[selectedLanguage],
    changeLanguage: changeLanguage,
  }),[selectedLanguage]);

  return (
    <LanguageContext.Provider value={provider}>
      {children}
    </LanguageContext.Provider>
  );
}