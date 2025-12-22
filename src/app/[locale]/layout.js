import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import './globals.css';
import { ReduxProvider } from '@/components/ReduxProvider';
import { Geist, Geist_Mono } from 'next/font/google';
import HeadScripts from '@/components/HeadScripts';

export const metadata = {
  title: 'Remove People from photos in Seconds | EditPixelAI App',
  description:
    'AI removes unwanted people from your photos in seconds. Free online tool, no Photoshop skills required. Upload → erase → download.',
  authors: [{ name: 'EditPixel AI', url: 'https://editpixelai.com' }],
  formatDetection: { telephone: false, address: false },
  appleWebApp: { capable: true, statusBarStyle: 'white' },
  other: { 'X-UA-Compatible': 'IE=edge,chrome=1' },
  icons: [{ rel: 'icon', url: '/static/images/assets/favicon.ico' }],
  alternates: { canonical: 'https://editpixelai.com' },
};
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
      <head>
        <HeadScripts />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ReduxProvider>
              {children}
          </ReduxProvider>
        </NextIntlClientProvider>

      </body>
    </html>
  );
}