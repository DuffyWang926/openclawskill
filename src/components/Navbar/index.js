'use client';                       // ← 必须标记为客户端组件

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';  // ✅ 正确来源
import { Layout, Menu, Button, Drawer, Space, Image } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
const { Header } = Layout;
import './index.css';
/* ---------- 真正使用路由的逻辑组件 ---------- */
const NavbarInner = () => {
  const router = useRouter();
  const pathname = usePathname();   // 当前路径
  const [open, setOpen] = useState(false);
  const t = useTranslations();

  const items = [
    { label: <Link href="/">{t('common.home')}</Link>, key: '/' },
    {
      label: t('common.tools'),
      key: '/products',
      children: [
        { label: <Link href="/remove-people-from-photos">{t('tools.removePeople')}</Link>, key: '/remove-people-from-photos' },
        { label: <Link href="/remove-watermark">{t('tools.removeWatermark')}</Link>, key: '/remove-watermark' },
        { label: <Link href="/remove-sora-watermark">{t('tools.removeSoraWatermark')}</Link>, key: '/remove-sora-watermark' },
      ],
    },
    // { label: <Link href="/about">关于</Link>, key: '/about' },
  ];

  const handleClick = ({ key }) => {
    router.push(key);
    setOpen(false);
  };
  const clickLogin = ({ key }) => {
    router.push('/login');
    setOpen(false);
  };
  

  return (
    <Header
      className='navHeader'
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 999,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
      }}
    >
      <Link className='logoBox'  href="/" style={{ color: '#fff', fontSize: 18, fontWeight: 500 }}>
        <Image className='navLogo'  src='/logo.png' alt='logo' preview={false}  />
      </Link>

      <div className="hidden md:block" style={{ flex: 1 }}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[pathname]}   // ✅ 用 pathname 代替 router.pathname
          items={items}
          onClick={handleClick}
          style={{ minWidth: 0, flex: 1 }}
          overflowedIndicator={<MenuOutlined />}
        />
      </div>

      <Space>
        <Button type="primary" ghost onClick={clickLogin}>{t('common.login')}</Button>
        {/* <Button type="primary" ghost>{t('common.profile')}</Button> */}
        <Button
          className="md:hidden"
          icon={<MenuOutlined />}
          onClick={() => setOpen(true)}
        />
      </Space>

      <Drawer
        placement="right"
        closable={false}
        open={open}
        onClose={() => setOpen(false)}
        style={{ padding: 0 }}
      >
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={items}
          onClick={handleClick}
        />
      </Drawer>
    </Header>
  );
};

/* ---------- 延迟挂载，避免 SSR 阶段使用 router ---------- */
export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? <NavbarInner /> : null;
}