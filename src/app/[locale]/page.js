'use client';
import InputBox from '@/components/InputBox';
import BannerCon from '@/components/BannerCon';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setOriginPath, setOriginStr, setIsShowVerify, setUA} from '@/features/home/homeSlice';
import { useTranslations } from 'next-intl';
import './index.css';
import ExampleBox from '@/components/ExampleBox';
import React, { useEffect } from 'react';
import { getLightFingerprint } from '@/utils/getUA';
export default function Home() {
  const t = useTranslations('home');
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
    title:t('homeTitle'),
    arr:[
      t('homeTip'),
      t('homeTipTwo') 
    ]
  }
  let examples = [
    {
      title:'soul-personality',
      detail:'Core personality and values system. Defines agent behavior with explicit instructions: "be genuinely helpful, have opinions, be resourceful." No fine-tuning needed—just well-crafted prompts.', 
      points:'0',
      cmdStr:''
    },
    {
      title:'memory-system',
      detail:'File-based memory architecture. Reads memory/YYYY-MM-DD.md for recent context and MEMORY.md for long-term memories. No vector database—just markdown files that update as the agent learns.', 
      points:'0',
      cmdStr:''
    },
    {
      title:'bootstrap-ritual',
      detail:'First-run experience that creates the "coming alive" moment. Guides agents through identity discovery with "Who am I? Who are you?" prompts. Theatrical but effective for memorable first impressions.', 
      points:'0',
      cmdStr:''
    },
    {
      title:'identity-builder',
      detail:'Dynamic identity system where agents define their own name, creature type, vibe, and emoji during first conversation. Creates unique personalities through structured markdown templates.', 
      points:'0',
      cmdStr:''
    },
    {
      title:'telegram-adapter',
      detail:'Minimal Telegram bot adapter connecting messaging platforms to Claude Code. Demonstrates core OpenClaw messaging patterns: receive message, call Claude, send response. ~100 lines of Python.', 
      points:'0',
      cmdStr:''
    },
    {
      title:'system-prompt-engine',
      detail:'Deep dive into system prompt construction. Covers base identity injection, tool definitions, skill discovery, memory recall, and heartbeat systems. Essential for understanding OpenClaw behavior.', 
      points:'0',
      cmdStr:''
    },

  ]
  
  let exampleBoxData = {
    title:'home.midTitle',
    tip:'home.midTip',
    list:examples
  }
  return (
    <div className="homePage">
      <BannerCon data={bannerData}/>
      <InputBox
        str={''}
        holderStr={t('searchHolder') }
        onEnter={onEnter}
      />
      < ExampleBox {...exampleBoxData}/>
      
    </div>
  );
}
