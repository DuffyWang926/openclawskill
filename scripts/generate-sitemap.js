// scripts/generate-sitemap.js
const fs = require('fs');
const path = require('path');

// 1. 域名
const BASE_URL = 'https://editpixelai.com';

// 2. 扫描页面
const glob = require('glob');
const routeFiles = glob.sync('src/app/**/page.{js,jsx,ts,tsx}');

const pages = routeFiles
  .map(file =>
    file
      .replace(/\\/g, '/')
      .replace(/^src\/app\/\[locale\]\//, '')
      .replace(/^page\.(js|jsx|ts|tsx)$/, '')
      .replace(/\/page\.(js|jsx|ts|tsx)$/, '')
  )
  .filter(p => !p.includes('['))
  .map(p => (p === '' ? '' : p));

// 3. 生成 url（单语言）
const urls = pages.map(p => {
  const slug = p ? `/${p}` : '';
  return `  <url>
    <loc>${BASE_URL}${slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
  </url>`;
});

// 4. 输出 XML
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

// 5. 写入 public
const out = path.join(process.cwd(), 'public', 'sitemap.xml');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, xml);
console.log('✅ sitemap.xml 已生成 ->', out);