'use client';

import { useRef, useState } from 'react';
import './index.css';
import SlideReveal from '@/components/SlideReveal';
import { useTranslations } from 'next-intl';
export default function ExampleBox({ title, list }) {
  const t = useTranslations();
  const exampleNode = list.map( (v,i) =>{
    let res = (
      <SlideReveal
          topSrc={v.after}
          bottomSrc={v.before}
          key={'removePeoplehoverReveal' + i}
          alt="compare image"
        />

    )
    return res
  })
  return (
    <div className="exampleBox">
        <h2 className="exempleTop">
          {t(title)}
        </h2>
        <div className="exampleWrapper">
          {exampleNode}
        </div>
      </div>
  );
}