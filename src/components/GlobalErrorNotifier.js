'use client';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'antd';
import { clearGlobalError } from '@/features/ui/uiSlice';
import { useTranslations } from 'next-intl'; // ➕

export default function GlobalErrorNotifier({msg,clickConfirm}) {
  const dispatch = useDispatch();
  const t = useTranslations(); // ➕

  const raw = useSelector(state => state.ui.globalError); // { code, message }
  // 优先级：后端返回文案 > 网络错误 > 默认状态码文案

  let errorMessage = ''
  if(msg){
    errorMessage = msg
  }else{
    if(raw){
      let code = raw.code
      if(raw.message){
        errorMessage = raw.message
      }else{
        if(code == 500){
          errorMessage = t('error.netError')
        }
      }
    }
  }
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (errorMessage) setModalOpen(true);
  }, [raw]);

  const handleClose = () => {
    setModalOpen(false);
    dispatch(clearGlobalError());
  };
  const handleConfirm = () => {
    setModalOpen(false);
    dispatch(clearGlobalError());
    clickConfirm && clickConfirm();

  };

  return (
    <Modal
      open={modalOpen}
      title=""
      onCancel={handleClose}
      footer={[
        <Button key="ok" type="primary" onClick={handleConfirm}>
          {t('common.confirm')} {/* ➕ */}
        </Button>
      ]}
    >
      {errorMessage}
    </Modal>
  );
}