import React, { useEffect, useState } from 'react';

export type Lang = 'en' | 'hi';

const I18nCtx = React.createContext<{ lang: Lang; setLang: (l: Lang) => void } | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = React.useState<Lang>(() => (localStorage.getItem('lang') as Lang) || 'en');
  const change = (l: Lang) => { setLang(l); localStorage.setItem('lang', l); };
  return <I18nCtx.Provider value={{ lang, setLang: change }}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = React.useContext(I18nCtx);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

export function useTranslation() {
  const { lang } = useI18n();
  const [t, setT] = useState<Record<string, string>>({});
  useEffect(() => {
    import(`../locales/${lang}.json`).then(mod => setT(mod.default)).catch(() => setT({}));
  }, [lang]);
  return t;
}

