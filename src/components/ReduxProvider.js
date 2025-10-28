'use client'; // 仅需一次

import { Provider } from 'react-redux';
import { store } from '@/store';
import {HeroUIProvider} from "@heroui/react";
import { useRouter } from 'next/navigation';
import GlobalErrorNotifier from '@/components/GlobalErrorNotifier'; 

export function ReduxProvider({ children }) {
  const router = useRouter();

  return (
    <Provider store={store}>
      <HeroUIProvider navigate={router.push}>
        {children}
        <GlobalErrorNotifier /> 
      </HeroUIProvider>
    </Provider>
  );
}