import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import './globals.css';
import { ReduxProvider } from '@/components/ReduxProvider';
// 如果还用 Geist 字体，保留引用
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

/* ---------- 1. 生成静态段，让 /zh /en 被预渲染 ---------- */
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'zh' }];
}

/* ---------- 2. 服务端组件：注入翻译 + Redux ---------- */
export default async function LocaleLayout({ children, params }) {
  const { locale } = await params; 
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <ReduxProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}