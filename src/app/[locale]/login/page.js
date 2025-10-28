'use client';

// import NavBar from '@/components/NavBar';
import './index.css';              // 把原 Taro 的样式拷过来即可
import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useSelector, useDispatch } from 'react-redux';
import { postLogin } from '@/features/auth/authThunks.js';
import {
  Input, 
  // Button, 
  Card, CardBody, Spacer,
   Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
   useDisclosure,
   Spinner,
} from '@heroui/react';
import {Button} from '@heroui/button'; 
const CLIENT_ID = '327783958246-h2605htmt2268qhut1nc5lugthm9ufl7.apps.googleusercontent.com';
const REDIRECT_URI = 'https://editpixelai.com/callback';

export default function LoginPage() {
  const  t = useTranslations();
  const dispatch = useDispatch();
  const user        = useSelector((state) => state.login);
  const isRegister  = useSelector((state) => state.login.isRegister);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [modalMsg, setModalMsg] = useState('');

  // 表单状态
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [code, setCode]             = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [codeError, setCodeError]   = useState('');
  const [isCode, setIsCode]         = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isRegister) setIsCode(true);
  }, [isRegister]);

  /* ===== 校验函数（原封不动） ===== */
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
    // Next 没有 Taro 的 router.params，用 searchParams 或路由段代替
    // 这里先留空对象，可按实际需要改
    const type = new URLSearchParams(window.location.search).get('type') || '';

    const okEmail    = validateEmail(email);
    const okPwd      = validatePassword(password);
    const okCode     = isCode ? validateCode(code) : true;

    if (okEmail && okPwd && okCode) {
      setLoading(true);               // 1. 打开 Spinner
      await dispatch(postLogin({      // 2. 调接口
        email,
        pwd: password,
        emailCode: code,
        codeMsg: t('login.codeMsg'),
        failMsg: t('login.failMsg'),
        type
      }));
      setLoading(false);
    } else {
      // setModalMsg('请检查表单');
      // onOpen();
    }
  };

  /* ===== Google 登录 ===== */
  const gotoGoogle = () => {
    const url =
      'https://accounts.google.com/o/oauth2/v2/auth?' +
      `client_id=${CLIENT_ID}` +
      `&redirect_uri=${REDIRECT_URI}` +
      '&response_type=code' +
      '&scope=email profile' +
      '&state=next';
    window.location.href = url;
  };

  /* ===== UI ===== */
  return (
    <div className='loginPage'>
      <Card className='loginCon max-w-md w-full shadow-medium'>
        <CardBody className='gap-4'>
          <Input
            label={t('login.email')}
            placeholder={t('login.pleaseEmail')}
            value={email}
            onValueChange={setEmail}
            onBlur={() => validateEmail(email)}
            isInvalid={!!emailError}
            errorMessage={emailError}
          />
          <Input
            label={t('login.password')}
            placeholder={t('login.pleasePwd')}
            type='password'
            value={password}
            onValueChange={setPassword}
            onBlur={() => validatePassword(password)}
            isInvalid={!!passwordError}
            errorMessage={passwordError}
          />
          {isCode && (
            <Input
              label={t('login.code')}
              placeholder={t('login.pleaseCode')}
              type='text'
              value={code}
              onValueChange={setCode}
              onBlur={() => validateCode(code)}
              isInvalid={!!codeError}
              errorMessage={codeError}
            />
          )}
          <Spacer y={2} />
          <Button className='btn'  color='primary' onPress={handleSubmit}>
            {t('common.login')} / {t('common.register')}
          </Button>
          <Button className='btn'  variant='bordered' onPress={gotoGoogle}>
            Google Login
          </Button>
        </CardBody>
      </Card>
      <Modal isOpen={true} onOpenChange={onOpenChange} size="sm">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>提示</ModalHeader>
              <ModalBody>{modalMsg}</ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  知道了
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <Spinner size="lg" color="primary" label="正在登录..." />
        </div>
      )}
    </div>
  );
}