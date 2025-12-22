'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import './index.css'

export default function AppFooter() {
  const t = useTranslations();

  // 右侧导航数据
  let list = [
    
    {
      title:'tools.remover',
      navList: [
        { key: 'tools.removePeople', href: '/remove-people-from-photos' },
        { key: 'tools.removeWatermark', href: '/remove-watermark' },
        { key: 'tools.removeSoraWatermark', href: '/remove-sora-watermark' },
        { key: 'tools.removeBackground', href: '/remove-background' },
      ]
    },
    {
      title:'common.company',
      navList: [
        { key: 'common.privacy', href: '/privacy' },
        { key: 'common.contact', href: '/contact' },
        { key: 'common.service', href: '/service' },
      ]
    },
  ]

  const listNode = list.map( (v,i) =>{
    const { navList } = v
    let navNode = navList.map((item) => (
      <div className="itemLink" key={item.key}>
        <Link href={item.href} >
          {t(item.key)}
        </Link>
      </div>
    ))

    let res = (
      <div className="footerItem" key={v.title}>
        <div className="itemTop">
          {t(v.title)}
        </div>
      {navNode}
      </div>)
    return res
  })

  return (
    <footer className="footer">
      <div className="footerLeft">
        <Link href="/">
            <Image
              src="/logo.png"   // 放在 public 目录
              alt="logo"
              width={40}
              height={40}
              style={{ objectFit: 'contain' }}
            />
        </Link>
      </div>
      <div className="footerRight">
        {listNode}
      </div>
        
    </footer>
  );
}