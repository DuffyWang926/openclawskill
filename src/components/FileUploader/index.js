"use client";

import React from 'react';
import { Upload, Button, Modal, message, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import './index.css';

const { Text } = Typography;

const FileUploader = ({ 
  onFileChange, 
  supportedFormats = ['image/jpeg', 'image/png', 'image/avif', 'image/webp'],
  errorMessage 
}) => {
  const t = useTranslations('uploader'); 
  const commonT = useTranslations('common');
  const loginState = useSelector((state) => state.login);
  const router = useRouter();

  // 获取格式显示文本
  const getFormatsText = () => {
    const formatMap = {
      'image/jpeg': 'JPEG',
      'image/png': 'PNG',
      'image/avif': 'AVIF',
      'image/webp': 'WEBP'
    };
    return supportedFormats.map(f => formatMap[f] || f).join(', ');
  };

  // 验证逻辑
  const validateFile = (file) => {
    
    // 2. 格式校验
    const isValidFormat = supportedFormats.includes(file.type);
    if (!isValidFormat) {
      message.error(t('error'));
      return Upload.LIST_IGNORE;
    }

    // 3. 校验通过，模拟原始逻辑的回调
    if (onFileChange) {
      // 在浏览器环境中，filePath 通常使用 URL.createObjectURL 生成预览地址
      const previewPath = URL.createObjectURL(file);
      onFileChange(file, previewPath);
    }

    // 返回 false 停止 AntD 自动上传行为，因为我们通常在编辑器里手动处理
    return false;
  };

  return (
    <div className="fileUploader">
      <div className="uploadBox">
        <Upload
          accept={supportedFormats.join(',')}
          showUploadList={false}
          beforeUpload={validateFile}
          multiple={false}
        >
          <Button 
            className="uploadBtn" 
            icon={<UploadOutlined />} 
            size="large"
            type="primary"
          >
            {t('uploadPicture')}
          </Button>
        </Upload>
      </div>

      <div className="uploadInfo" style={{ marginTop: '12px', textAlign: 'center' }}>
        <Text type="secondary" className="supportedFormats" style={{ display: 'block' }}>
          {t('supportedFormats')} {getFormatsText()}
        </Text>
        
        {errorMessage && (
          <Text danger className="error-message" style={{ display: 'block', marginTop: '4px' }}>
            {errorMessage}
          </Text>
        )}
      </div>
    </div>
  );
};

export default FileUploader;