'use client';

import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { useTranslations } from 'next-intl';
import './index.css';   // 如需自定义样式可保留
import { Turnstile } from '@marsidev/react-turnstile';
import { postVerify } from '@/features/home/homeThunks.js';
import { useDispatch, useSelector } from 'react-redux';
import { setIsVerified, setIsShowVerify } from '@/features/home/homeSlice';
export default function InputBox({ onEnter, str }) {
  const t = useTranslations();
  const dispatch = useDispatch();
  const homeState = useSelector((state) => state.home);
  const { isShowVerify } = homeState;
  
  const handleClose = () => {
    dispatch(setIsShowVerify({isShowVerify:false}));
  };
  const handleConfirm = () => {
    dispatch(setIsVerified({isShowVerify:false}));
  };
  const onVerify = async (cfToken) => {
    console.log('cfToken', cfToken)

    let res = await dispatch(postVerify({
      token: cfToken,
    }));
    console.log('res',res)
    let isSuccess = false;
    if(res?.payload?.data?.success){
      isSuccess = true;
      dispatch(setIsShowVerify({isShowVerify:false}));
      dispatch(setIsVerified({ isVerified:true, token:cfToken}));
    }
    
  };
  return (
    <div className="verify">
      <Modal
        open={isShowVerify}
        title=""
        onCancel={handleClose}
        footer={[]}
        className="verifyModal"
      >
        { isShowVerify && <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
          onSuccess={onVerify}
        />
        
        }
      </Modal>
      
      
    </div>
  );
}