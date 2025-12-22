'use client';

import React, { useState } from 'react';
import { Upload, Input, Button, Image } from 'antd';
import { UploadOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import './index.css';   // 如需自定义样式可保留
import GlobalErrorNotifier from '@/components/GlobalErrorNotifier'; 
const { TextArea } = Input;

export default function InputBox({ onEnter, str }) {
  const t = useTranslations();
  const [inputVal, setInputVal] = useState(str || '');
  const [isModal, setIsModal] = useState(false);

  // 发送
  const handleEnter = () => {
    let val = inputVal || str
    let testStr = 'https://sora.chatgpt.com/p'
    if (inputVal.startsWith(testStr)) {
      onEnter(val);
      
    }else{
      setIsModal(true)

    }
    
  };

  return (
    <div className="inputEditor">
      {/* 中间输入 */}
      <div className="inputBox">
        <TextArea
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={t('tools.soraHolder')}
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
      {isModal && <GlobalErrorNotifier  msg={t('tools.soraTip')}  /> }
    </div>
  );
}