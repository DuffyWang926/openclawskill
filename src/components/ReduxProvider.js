'use client'; // 仅需一次

import { Provider, useSelector } from 'react-redux';
import { store } from '@/store';
import { useRouter } from 'next/navigation';
import GlobalErrorNotifier from '@/components/GlobalErrorNotifier'; 
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Spin } from 'antd';
import Navbar from '@/components/Navbar/index';
import Footer from '@/components/Footer';
function StoreAwareLayout({ children }) {
  const loading = useSelector(state => state.ui.globalLoading > 0);
  return (
    <>
      <Navbar/>
      <Spin spinning={loading} tip="loading...">
        {children}
      </Spin>
      <Footer />
      <GlobalErrorNotifier />
    </>
  );
}

export function ReduxProvider({ children }) {

  return (
    <Provider store={store}>
      <AntdRegistry>
        <StoreAwareLayout>{children}</StoreAwareLayout>
      </AntdRegistry>
      
    </Provider>
  );
}