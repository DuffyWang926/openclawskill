// app/components/HeadScripts.js
'use client';

export default function HeadScripts() {
  return (
    <>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <link rel="canonical" href="https://editpixelai.com" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            '@id': 'https://editpixelai.com/#organization',
            name: 'EditPixel AI',
            url: 'https://editpixelai.com',
            logo: 'https://editpixelai.com/public/logo.png',
            description:
              'AI-powered online image editor that removes people from photos, enhances resolution in one click.',
            email: 'mengshikejiwang@163.com',
            foundingDate: '2025-10',
            address: { '@type': 'PostalAddress', addressCountry: 'CN' },
          }),
        }}
      />
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-0RX9VV3EPM" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0RX9VV3EPM');
          `,
        }}
      />
    </>
  );
}