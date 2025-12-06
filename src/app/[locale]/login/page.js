'use client';

import './index.css';
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useSelector, useDispatch } from 'react-redux';
import { postLogin } from '@/features/auth/authThunks.js';
import { Card, Input, Button, Space } from 'antd';
import 'antd/dist/reset.css';
import { useRouter } from 'next/navigation';
const CLIENT_ID = '327783958246-h2605htmt2268qhut1nc5lugthm9ufl7.apps.googleusercontent.com';
const REDIRECT_URI = 'https://editpixelai.com/callback';

export default function LoginPage() {
  const t = useTranslations();
  const router = useRouter();
  const dispatch = useDispatch();
  const loginState       = useSelector(state => state.login);
  const { isRegister } = loginState

  // 表单状态
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [code, setCode]             = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [codeError, setCodeError]   = useState('');

  /* ===== 校验 ===== */
  const validateEmail = (val) => {
    if (!val) { setEmailError(t('login.emailEmptyError')); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setEmailError(t('login.emailTypeError')); return false;
    }
    setEmailError(''); return true;
  };
  const validatePassword = (val) => {
    if (!val) { setPasswordError(t('login.pwdEmptyError')); return false; }
    if (val.length < 6) { setPasswordError(t('login.pwdTypeError')); return false; }
    setPasswordError(''); return true;
  };
  const validateCode = (val) => {
    if (!val) { setCodeError(t('login.codeEmptyError')); return false; }
    if (val.length !== 6) { setCodeError(t('login.codeTypeError')); return false; }
    setCodeError(''); return true;
  };

  /* ===== 提交 ===== */
  const handleSubmit = async () => {
    const type = new URLSearchParams(window.location.search).get('type') || '';
    const okEmail = validateEmail(email);
    const okPwd   = validatePassword(password);
    const okCode  = isRegister ? validateCode(code) : true;
    console.log('password', password)

    if (okEmail && okPwd && okCode) {
      const action = await dispatch(postLogin({
        email,
        pwd: password,
        emailCode: code,
        codeMsg: t('login.codeMsg'),
        failMsg: t('login.failMsg'),
        type
      }));
      if (postLogin.fulfilled.match(action) ) {
        const { data } = action.payload;
        const { isRegister } = data
        console.log('action.payload', action.payload)
        console.log('isRegister', isRegister)
        
        let url = ''
        if(type == 0){
          url = '/remove-people-from-photos'
        }else if(type == 1){
          url = '/remove-watermark'

        }else if(type == 2){
          url = '/remove-sora-watermark'

        }else if(type == 3){

        }
        if(!isRegister){
          router.push(url);
          
        }
      }
    }
  };

  /* ===== Google 登录 ===== */
  const gotoGoogle = () => {
    window.location.href =
      'https://accounts.google.com/o/oauth2/v2/auth?' +
      `client_id=${CLIENT_ID}` +
      `&redirect_uri=${REDIRECT_URI}` +
      '&response_type=code' +
      '&scope=email profile' +
      '&state=next';
  };

  /* ===== UI ===== */
  return (
    <div className='loginPage'>
      <Card className='loginCon max-w-md w-full shadow-medium'>
        <Space direction='vertical' size='large' className='w-full'>
          <Input
            placeholder={t('login.email')}
            value={email}
            onChange={e => setEmail(e.target.value)}
            onBlur={() => validateEmail(email)}
            status={emailError ? 'error' : ''}
          />
          {emailError && <div className='text-red-500 text-sm -mt-2'>{emailError}</div>}

          <Input.Password
            placeholder={t('login.password')}
            value={password}
            onChange={e => setPassword(e.target.value)}
            onBlur={() => validatePassword(password)}
            status={passwordError ? 'error' : ''}
          />
          {passwordError && <div className='text-red-500 text-sm -mt-2'>{passwordError}</div>}

          {isRegister && (
            <>
              <Input
                placeholder={t('login.code')}
                value={code}
                onChange={e => setCode(e.target.value)}
                onBlur={() => validateCode(code)}
                status={codeError ? 'error' : ''}
              />
              {codeError && <div className='text-red-500 text-sm -mt-2'>{codeError}</div>}
            </>
          )}

          <Button type='primary' size='large' onClick={handleSubmit} block>
            {t('common.login')} / {t('common.register')}
          </Button>

          <Button size='large' onClick={gotoGoogle} block>
            Google Login
          </Button>
        </Space>
      </Card>
    </div>
  );
}