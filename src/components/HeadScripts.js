// app/components/HeadScripts.js
'use client';

export default function HeadScripts() {
  return (
    <>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <link rel="canonical" href="https://openclawskill.org" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            '@id': 'https://openclawskill.org/#organization',
            name: 'EditPixel AI',
            url: 'https://openclawskill.org',
            logo: 'https://openclawskill.org/public/logo.png',
            description:
              'AI-powered online image editor that removes people from photos, enhances resolution in one click.',
            email: 'mengshikejiwang@163.com',
            foundingDate: '2025-10',
            address: { '@type': 'PostalAddress', addressCountry: 'CN' },
          }),
        }}
      />
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-Z7N7WFV18G "></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments)}
            gtag('js', new Date());
            gtag('config', 'G-Z7N7WFV18G');
          `,
        }}
      />
    </>
  );
}