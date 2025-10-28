// src/navigation.js
import {createNavigation} from 'next-intl/navigation';

export const locales = ['en', 'zh'];
export const defaultLocale = 'en';
export const localePrefix = 'never'; // 或 'always'

export const navigation = createNavigation({
  locales,
  defaultLocale,
  localePrefix,
});

