'use client';

import React, { useState } from 'react';
import { Upload, Button, Image, Space } from 'antd';
import { UploadOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import './index.css';   // 如需自定义样式可保留
const uploadImg = '/icons/upload.svg'
const SmallFileUploader = ({
  onFileChange,
  supportedFormats = ['image/jpeg', 'image/png', 'image/avif', 'image/webp'],
  errorMessage,
}) => {
  const t = useTranslations('uploader'); // 对应 messages 里的 uploader 字段
  const [filePath, setFilePath] = useState('');
  const [isClose, setIsClose] = useState(false);

  // 文件选择回调
  const handleChange = (info) => {
    const file = info.file;
    if (!file) return;

    // 格式校验
    if (!supportedFormats.includes(file.type)) {
      errorMessage && errorMessage(t('formatError'));
      return;
    }

    // 本地预览
    const url = URL.createObjectURL(file);
    setFilePath(url);
    onFileChange(file, url);
  };

  // 删除预览
  const handleRemove = () => {
    setFilePath('');
    onFileChange(null, '');
  };

  return (
    <div
      className="smallFileUploader"
      onMouseEnter={() => setIsClose(true)}
      onMouseLeave={() => setIsClose(false)}
    >
        {filePath ? (
          <div style={{ position: 'relative' }}>
            <Image
              width={100}
              height={100}
              src={filePath}
              alt="preview"
              style={{ objectFit: 'cover', borderRadius: 4 }}
            />
            {isClose && (
              <CloseCircleOutlined
                style={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  fontSize: 18,
                  color: '#fff',
                  background: '#001529',
                  borderRadius: '50%',
                  cursor: 'pointer',
                }}
                onClick={handleRemove}
              />
            )}
          </div>
        ) : (
          <Upload
            accept={supportedFormats.join(',')}
            showUploadList={false}
            beforeUpload={() => false} // 手动处理，不自动上传
            onChange={handleChange}
          >
            <Image width={40}
              height={40} 
              preview={false}
              className="uploadImg" src={uploadImg}   alt='upload'/>
          </Upload>
        )}
    </div>
  );
};

export default SmallFileUploader;