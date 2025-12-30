'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import './index.css';

export default function SlideReveal({ topSrc, bottomSrc, alt = '' }) {
  const containerRef = useRef(null);
  const [clipPercent, setClipPercent] = useState(50);

  /* ---------- 统一计算逻辑 ---------- */
  const updateClip = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setClipPercent(percent);
  };

  /* ---------- 鼠标滑过（桌面） ---------- */
  const handleMouseMove = (e) => updateClip(e.clientX);

  /* ---------- 手指拖动（移动端） ---------- */
  const handleTouchMove = (e) => {
    // 防止页面滚动
    e.preventDefault();
    updateClip(e.touches[0].clientX);
  };

  return (
    <div
      className="wrapper"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchStart={(e) => updateClip(e.touches[0].clientX)} // 按下即生效
    >
      {/* 下层图片 */}
      <div className="layer">
        <Image src={bottomSrc} fill alt={alt} priority />
      </div>

      {/* 上层图片 + 动态裁剪 */}
      <div
        className="layer"
        style={{ clipPath: `inset(0 0 0 ${clipPercent}%)` }}
      >
        <Image src={topSrc} fill alt={alt} priority />
      </div>

      {/* 跟随线 */}
      <div
        className="line"
        style={{ left: `${clipPercent}%` }}
      />
    </div>
  );
}