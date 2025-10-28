'use client';

import {locales, usePathname, useRouter} from '@/navigation';

export default function LangSwitcher() {
  const pathname = usePathname();
  const router   = useRouter();

  return (
    <select
      onChange={(e) => router.push(pathname, {locale: e.target.value})}
    >
      {locales.map((l) => (
        <option key={l} value={l}>{l.toUpperCase()}</option>
      ))}
    </select>
  );
}