'use client';
import InputEditor from '@/components/InputEditor';
import BannerCon from '@/components/BannerCon';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setOriginPath, setOriginStr } from '@/features/home/homeSlice';
import { useTranslations } from 'next-intl';
import './index.css';
import SlideReveal from '@/components/SlideReveal';

export default function Home() {
  const t = useTranslations('removePeople');
  const router = useRouter();
  const dispatch = useDispatch();
  const handleUpload = (originfile,filePath) => {
    dispatch(setOriginPath(filePath));
  };
  const onEnter = (str) => {
    dispatch(setOriginStr(str));
    router.push('/remove-people-from-photos');
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
  const exampleNode = examples.map( (v,i) =>{
    let res = (
      <SlideReveal
          topSrc={v.after}
          bottomSrc={v.before}
          key={'hoverReveal' + i}
          alt="compare image"
        />

    )
    return res
  })
  return (
    <div className="homePage">
      <BannerCon data={bannerData}/>
      <InputEditor
        str={''}
        onFileChange={handleUpload}
        onEnter={onEnter}
      />
      <div className="exempleBox">
        {exampleNode}

      </div>
      
    </div>
  );
}
