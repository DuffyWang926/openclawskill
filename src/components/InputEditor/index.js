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
    <div className="inputEditor">
      {/* 左侧上传 */}
      <div className="uploadFile">
        <SmallFileUploader 
            onFileChange={onFileChange}
            supportedFormats={['image/jpeg', 'image/png']}
          />
      </div>

      {/* 中间输入 */}
      <div className="inputBox">
        <TextArea
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={t('inputHolder')}
          autoSize={{ minRows: 2, maxRows: 6 }}
          className="inputArea"
        />
      </div>

      {/* 右侧发送 */}
      <div className="btnBox" onClick={handleEnter}>
        <Button
          type="primary"
          shape="circle"
          icon={<ArrowUpOutlined />}
          size="large"
        />
      </div>
    </div>
  );
}