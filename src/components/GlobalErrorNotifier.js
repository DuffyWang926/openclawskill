"use client";
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, 
    Button, useDisclosure 
} from '@heroui/react';
import { clearGlobalError } from '@/features/ui/uiSlice'; // 确保路径正确

// 监听全局 UI Slice 的错误路径
const selectGlobalError = (state) => state.ui.globalError; 

export default function GlobalErrorNotifier() {
    const dispatch = useDispatch();
    const errorMessage = useSelector(selectGlobalError);
    // 使用 useDisclosure 控制 Modal 状态
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    
    // 监听 Redux 错误状态，一旦有值就打开 Modal
    useEffect(() => {
        if (errorMessage && !isOpen) { // 确保有错误且 Modal 未打开
            onOpen(); 
        }
    }, [errorMessage, onOpen, isOpen]);
    
    // 处理 Modal 关闭：清除 Redux 状态中的错误
    const handleClose = () => {
        onClose();
        dispatch(clearGlobalError()); 
    };

    return (
        <Modal 
            isOpen={isOpen} 
            onOpenChange={handleClose} 
            size="sm"
            isDismissable={false} // 不允许点击背景关闭，必须点按钮
        >
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="text-red-500">操作失败</ModalHeader>
                        <ModalBody>{errorMessage}</ModalBody>
                        <ModalFooter>
                            <Button color="danger" onPress={handleClose}>
                                知道了
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
