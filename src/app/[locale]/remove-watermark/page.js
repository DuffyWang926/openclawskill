'use client';
import InputEditor from '@/components/InputEditor';
import Editor from '@/components/Editor';
import BannerCon from '@/components/BannerCon';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { resetPath  } from '@/features/edit/editSlice';
import { upload } from '@/features/edit/editThunks.js';
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
  const { batchId, handlePaths, current, videoUrl } = editState;
  const { userId } = loginState;
  const [isModal, setIsModal] = useState(false);
  const [showTabs, setShowTabs] = useState(false);
  const [mode, setMode] = useState('chat'); 
  useEffect(() => {
    dispatch(resetPath(originPath));
  }, [originPath]);

  let imgSrc = ''
  if(current == -1){
    imgSrc = originPath
  }else{
    imgSrc = handlePaths[current]
  }


  const handleUpload = (originfile,filePath) => {
    dispatch(resetPath(filePath));
  };
  const onEnter = async (str) => {
    debugger
    if (userId) {
      let formData = new FormData();
      formData.append('userId', loginState.userId);
      formData.append('editStr', str);

      if (imgSrc.includes('blob')) {
        // 走 blob 上传
        const res = await fetch(imgSrc);
        const blob = await res.blob();
        formData.append('gif', blob, 'origin.gif');
        formData.append('isOrigin', 'true');
      } else {

        formData.append('imgSrc', imgSrc);
      }
      try {
        await dispatch(upload({ formData }));
        message.success('upload success');
      } catch (e) {
        message.error('upload failed');
      } 
      
    }else{
      setIsModal(true);
      
    }
    
  };

  const handleConfirm = () => {
    router.push('/login?type=0');
  }

  const bannerData = {
    title:t('tools.watermarkTitle'),
    arr:[
      t('tools.watermarkTipOne'),
      t('removePeople.removeTipTwo') 
    ]
  }
  let examples = [
    {
      before:"/examples/7.png",
      after:"/examples/8.png",
    },
    {
      before:"/examples/9.png",
      after:"/examples/10.png",
    },
    {
      before:"/examples/11.png",
      after:"/examples/12.png",
    },

  ]
  const exampleNode = examples.map( (v,i) =>{
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
    <div className="removePeoplePage">
      <BannerCon data={bannerData}/>
      { imgSrc && < Image  className='removeImg' src={ imgSrc} preview={false}/>}
      { showTabs ?
        <Space className="editorBox" direction="vertical" style={{ width: '100%' }}>
          <Space className="editorBtns">
            <Button
              type={mode === 'chat' ? 'primary' : 'text'}
              onClick={() => setMode('chat')}
            >
              Chat Editor
            </Button>
            <Button
              type={mode === 'manual' ? 'primary' : 'text'}
              onClick={() => setMode('manual')}
            >
              Manual Editor
            </Button>
          </Space>
          <div className="editorCon">
            {mode === 'chat' ? (
              <InputEditor
                str={originStr}
                onFileChange={handleUpload}
                onEnter={onEnter}
              />
            ) : (
              <Editor />
            )}
          </div>
          
        </Space>
        :
        <InputEditor
          str={originStr}
          onFileChange={handleUpload}
          onEnter={onEnter}
        />
      }
     
     {/* <Button type="primary" onClick={() => setShowTabs(v => !v)}>
      {showTabs ? '收起' : '高级模式'}
    </Button> */}
      <div className="exempleBox">
        
        {exampleNode}
      </div>
      {isModal && <GlobalErrorNotifier  msg={t('common.pleaseLogin')} clickConfirm={handleConfirm} /> }
    </div>
  );
}
