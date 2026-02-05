'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import './index.css';
import { useTranslations } from 'next-intl';
export default function SlideReveal({ title, detail, points }) {
  const t = useTranslations();


  return (
    <div className="skillCard"  >
      <div className="title" >
      {title}
      </div>
      <div className="detail" >
      {detail}
      </div>
      <div className="foot" >
      {t('common.points')}:{points}
      </div>
      
    </div>
  );
}