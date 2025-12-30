'use client';
import InputEditor from '@/components/InputEditor';
import Editor from '@/components/Editor';
import FileUploader from '@/components/FileUploader';
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
import { postUaPoints } from '@/features/home/homeThunks.js';
import { getLightFingerprint } from '@/utils/getUA';
import { setUA} from '@/features/home/homeSlice';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
export default function RemovePeople() {
  const t = useTranslations();
  const router = useRouter();
  const dispatch = useDispatch();
  const homeState = useSelector((state) => state.home);
  const editState = useSelector((state) => state.edit);
  const loginState = useSelector((state) => state.login);
  const { originPath, originStr, canvasId, ua } = homeState;
  const { batchId, handlePaths, current, videoUrl } = editState;
  const { userId } = loginState;
  const [isModal, setIsModal] = useState(false);
  const [mode, setMode] = useState('chat'); 
  useEffect(() => {
    const fetchFingerprint = async () => {
      const data = await getLightFingerprint();
      dispatch(setUA(data));
    };
    fetchFingerprint();
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
  const postImgApi = async (str, canvasId, ua) =>{
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
      if(canvasId, ua){
        formData.append('canvasId', canvasId);
        formData.append('ua', ua);
      }
      await dispatch(upload({ formData }));

  }
  const onEnter = async (str) => {
    console.log('onEnter',canvasId, ua)
    debugger
    if (userId) {
      await postImgApi(str)
      
    }else{
      let res = await dispatch(postUaPoints({canvasId, ua}))
      const { data } = res.payload
      const { isSuccess } = data
      debugger
      if(isSuccess){
        await postImgApi(str, canvasId, ua)

      }else{
        setIsModal(true);
      }
    }
    
  };

  const handleConfirm = () => {
    router.push('/login?type=0');
  }

  const bannerData = {
    title:t('removePeople.removeTitle'),
    arr:[
      t('removePeople.removeTip'),
      t('removePeople.removeTipTwo') 
    ]
  }
  let examples = [
    {
      before:"/examples/1.png",
      after:"/examples/2.png",
    },
    {
      before:"/examples/3.png",
      after:"/examples/4.png",
    },
    {
      before:"/examples/5.png",
      after:"/examples/6.png",
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
  const downLoadImg = () =>{
    const link = document.createElement('a');
    link.href = imgSrc;
    link.download = 'my-image.jpg';   // 默认文件名
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  }
  const showManualTab = () =>{
    setMode('manual')
  }
  const onUpload = async (formData) =>{

    formData.append("batchId", batchId);
    formData.append("userId", userId);
    if (!imgSrc.includes('blob')) {
      formData.append('imgSrc', imgSrc);
    }else{
      // 走 blob 上传
      const res = await fetch(imgSrc);
      const blob = await res.blob();
      formData.append('gif', blob, 'origin.gif');
      formData.append('isOrigin', 'true');
    }
    try {
      await dispatch(upload({ formData }));
      message.success('upload success');
    } catch (e) {
      message.error('upload failed');
    } 

  }
  const handleFileUpload =  (originfile,filePath) => {
    console.log('Uploading:', originfile)
    console.log('filePath:', filePath)
    dispatch(resetPath(filePath));

  }
  let editorData = {
    imgSrc,
    onUpload:onUpload
  }
  
  return (
    <div className="removePeoplePage">
      { mode !== 'manual' && <BannerCon data={bannerData}/> }
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
            <div className="chatCon">
              { imgSrc && 
                <div className="resultBox"> 
                  < Image  className='removeImg' src={ imgSrc} preview={false}/> 
                  <div className="resultFoot">
                    <Button className='blackBtn' onClick={showManualTab}>
                      {t('edit.manualEditing')}
                    </Button>
                    <Button className='blackBtn' onClick={downLoadImg}>
                      {t('edit.download')}
                    </Button>
                  </div>
                </div>
              }
              <InputEditor
                str={originStr}
                onFileChange={handleUpload}
                onEnter={onEnter}
              />
            </div>
          ) : (
            <div className="manualBox">
              <FileUploader onFileChange={handleFileUpload} />
              <Editor {...editorData} />
            </div>
            
          )}
        </div>
        
      </Space>
      { mode !== 'manual' && <div className="exempleBox">
        
        {exampleNode}
      </div>
       }  
      
      {isModal && <GlobalErrorNotifier  msg={t('common.pleaseLogin')} clickConfirm={handleConfirm} /> }
    </div>
  );
}
