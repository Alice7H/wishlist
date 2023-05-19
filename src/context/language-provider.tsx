'use client'
import { dictionaryList, languages } from './../languages';
import {ReactNode, useMemo, useState } from 'react';
import { DictionaryType, LanguageContext } from './language-context';

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