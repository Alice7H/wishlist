'use client'
import { createContext } from 'react';
import { dictionaryList, languages } from './../languages';
import {ReactNode, useMemo, useState } from 'react';

export type DictionaryType = keyof typeof dictionaryList;

export const LanguageContext = createContext({
  language: 'pt',
  languages: languages,
  dictionary: dictionaryList.pt,
  changeLanguage: (value: DictionaryType) => {},
});

export default function LanguageProvider({children}: { children: ReactNode }) {
  const [selectedLanguage, setSelectedLanguages] = useState<DictionaryType>('pt');

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