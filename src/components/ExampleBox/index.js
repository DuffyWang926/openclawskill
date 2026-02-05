'use client';

import { useRef, useState } from 'react';
import './index.css';
import SkillCard from '@/components/SkillCard';
import { useTranslations } from 'next-intl';
export default function ExampleBox({ title, list, tip }) {
  const t = useTranslations();
  const exampleNode = list.map( (v,i) =>{
    let res = (
      <SkillCard
        {...v}
          key={'SkillCard' + i}
        />

    )
    return res
  })
  return (
    <div className="exampleBox">
        <h2 className="exempleTop">
          {t(title)}
        </h2>
        <div className="exempleTip">{t(tip) }</div>
        <div className="exampleWrapper">
          {exampleNode}
        </div>
      </div>
  );
}