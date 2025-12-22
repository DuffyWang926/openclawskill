'use client';
import InputBox from '@/components/InputBox';
import Editor from '@/components/Editor';
import BannerCon from '@/components/BannerCon';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setVideoStr  } from '@/features/edit/editSlice';
import { uploadVideo } from '@/features/edit/editThunks.js';
import { useTranslations } from 'next-intl';
import './index.css';
import SlideReveal from '@/components/SlideReveal';
import { Image, Button, message, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import GlobalErrorNotifier from '@/components/GlobalErrorNotifier'; 
import { Tabs } from 'antd';
const { TabPane } = Tabs;
export default function RemovePeople() {
  const t = useTranslations();
  const router = useRouter();
  const dispatch = useDispatch();
  const homeState = useSelector((state) => state.home);
  const editState = useSelector((state) => state.edit);
  const loginState = useSelector((state) => state.login);
  const { originPath, originStr } = homeState;
  const { videoUrl, videoStr } = editState;
  const { userId } = loginState;
  const [isModal, setIsModal] = useState(false);
  
  const onEnter = async (str) => {
    if (userId) {
      await dispatch(uploadVideo({url:str,userId}));
    }else{
      console.log('str',str)
      dispatch(setVideoStr(str));
      setIsModal(true);
    }
    
  };

  const handleConfirm = () => {
    router.push('/login?type=2');
  }

  const downloadVideo = () => {
    const a = document.createElement('a')
    a.href = videoUrl
    a.download = ''          // 默认用服务器文件名
    a.click()

  }

  const bannerData = {
    title:t('tools.soraTitle'),
    arr:[
      t('tools.soraTipOne'),
    ]
  }
  console.log('videoStr',videoStr)
  
  return (
    <div className="removeSoraPage">
      <BannerCon data={bannerData}/>
      <InputBox
          str={videoStr}
          onEnter={onEnter}
        />
      {
        videoUrl && 
        <div className='videoWrapper'>
          <div className='videoBox'> 
            <video
              src={videoUrl}
              controls
              autoplay={false}
            />
          </div>
          <div className='btn videoBtn' onClick={downloadVideo}> 
            download
          </div>

        </div>
      }
      {isModal && <GlobalErrorNotifier  msg={t('common.pleaseLogin')} clickConfirm={handleConfirm} /> }
    </div>
  );
}
