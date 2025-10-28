import {createSharedPathnamesNavigation} from 'next-intl/navigation';
import {locales} from './navigation';
import { getRequestConfig } from 'next-intl/server';

export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation({locales});

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
}));