'use client';

import React, { useState } from 'react';
import { Upload, Input, Button, Image } from 'antd';
import { UploadOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import './index.css';   // 如需自定义样式可保留
import SmallFileUploader from '@/components/SmallFileUploader'

const { TextArea } = Input;

export default function InputEditor({ onFileChange, onEnter, str }) {
  const t = useTranslations('common');
  const [inputVal, setInputVal] = useState(str || '');

  // 文件选择
  const handleUpload = (info) => {
    const file = info.file;
    if (!file) return;
    onFileChange(file);          // 保持与 Taro 版一致的回调签名
  };

  // 发送
  const handleEnter = () => {
    onEnter(inputVal);
  };

  return (
    <div className="editor">
      {/* 左侧上传 */}
      editor
    </div>
  );
}