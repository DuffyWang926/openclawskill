'use client';
import InputEditor from '@/components/InputEditor';
import BannerCon from '@/components/BannerCon';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setOriginPath, setOriginStr, setIsShowVerify, setUA} from '@/features/home/homeSlice';
import { useTranslations } from 'next-intl';
import './index.css';
import SlideReveal from '@/components/SlideReveal';
import ExampleBox from '@/components/ExampleBox';
import React, { useEffect } from 'react';
import { getLightFingerprint } from '@/utils/getUA';
export default function Home() {
  const t = useTranslations('removePeople');
  const router = useRouter();
  const dispatch = useDispatch();
  const homeState = useSelector((state) => state.home);
  const { isVerified } = homeState;
  useEffect(() => {
    const fetchFingerprint = async () => {
      const data = await getLightFingerprint();
      dispatch(setUA(data));
    };
    fetchFingerprint();
    if (isVerified){
      router.push('/remove-people-from-photos');
    }
  }, [isVerified]);
  
  const handleUpload = (originfile,filePath) => {
    dispatch(setOriginPath(filePath));
  };
  const onEnter = (str) => {
    dispatch(setOriginStr(str));
    dispatch(setIsShowVerify({isShowVerify:true}));
  };
  const bannerData = {
    title:t('removeTitle'),
    arr:[
      t('removeTip'),
      t('removeTipTwo') 
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
  
  let exampleBoxData = {
    title:'common.exampleTitle',
    list:examples
  }
  return (
    <div className="homePage">
      <BannerCon data={bannerData}/>
      <InputEditor
        str={''}
        onFileChange={handleUpload}
        onEnter={onEnter}
      />
      
      < ExampleBox {...exampleBoxData}/>
      
      
    </div>
  );
}
