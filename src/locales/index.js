// Stub locales - simplified for Home Decor Admin

export const allLangs = [
  { label: 'English', value: 'en', countryCode: 'GB', numberFormat: { code: 'en-US', currency: 'USD' } },
];

export function useTranslate() {
  return {
    t: (key) => key,
    i18n: { changeLanguage: () => {} },
    currentLang: {
      label: 'English',
      value: 'en',
      systemValue: {},
      icon: '/assets/icons/flags/ic-flag-en.svg',
    },
  };
}

export const useLocales = useTranslate;

export function LocalizationProvider({ children }) {
  return children;
}
