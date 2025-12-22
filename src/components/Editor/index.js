import React, { useState, useRef, useEffect } from 'react';
import { Button, Slider, Space, message } from 'antd';
import { 
  UndoOutlined, 
  HighlightOutlined, 
  ZoomInOutlined, 
  DownloadOutlined, 
  CloudUploadOutlined 
} from '@ant-design/icons';
import './index.css';
import { useTranslations } from 'next-intl';
const Editor = ({ imgSrc, onUpload, batchId, userId }) => {
  const t = useTranslations();
  const [brushSize, setBrushSize] = useState(20);
  const [zoomVal, setZoomVal] = useState(100);
  const [isBrushMode, setIsBrushMode] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paths, setPaths] = useState([]);
  const [step, setStep] = useState(0);

  // 动态宽高状态
  const [canvasDims, setCanvasDims] = useState({ width: 500, height: 500 });

  // --- Refs ---
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  // 最大显示限制（比如在页面上最大显示 600px）
  const MAX_DISPLAY_SIZE = 600;

  // --- 1. 动态计算画布尺寸 ---
  useEffect(() => {
    if (!imgSrc) return;

    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
      const originalW = img.naturalWidth;
      const originalH = img.naturalHeight;
      const ratio = originalW / originalH;

      let targetW, targetH;

      // 根据比例缩放，确保长边不超过 MAX_DISPLAY_SIZE
      if (ratio > 1) {
        // 横图
        targetW = Math.min(originalW, MAX_DISPLAY_SIZE);
        targetH = targetW / ratio;
      } else {
        // 竖图
        targetH = Math.min(originalH, MAX_DISPLAY_SIZE);
        targetW = targetH * ratio;
      }

      setCanvasDims({ width: targetW, height: targetH });
    };
  }, [imgSrc]);

  // --- 2. 初始化/更新 Canvas 上下文 ---
  // 当宽高改变时，Canvas 内部会自动重置，必须重新获取 ctx
  const reDraw = (currentStep) => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasDims.width, canvasDims.height);
    
    for (let i = 0; i < currentStep; i++) {
      const path = paths[i];
      if (path.length < 1) continue;
      ctx.beginPath();
      ctx.lineWidth = path[0].brushSize;
      ctx.moveTo(path[0].x, path[0].y);
      for (let j = 1; j < path.length; j++) {
        ctx.lineTo(path[j].x, path[j].y);
      }
      ctx.stroke();
    }
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = 'rgba(186, 251, 1, 0.4)';
    ctxRef.current = ctx;

    // 如果之前有路径，尺寸改变后可能需要重绘（如果比例没变，位置是准的）
    reDraw(step); 
  }, [canvasDims, step]); // 宽高变化或步数变化时重绘

  // --- 绘图逻辑 ---
  const getCoordinates = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const scale = zoomVal / 100;
    return {
      x: (e.clientX - rect.left) / scale,
      y: (e.clientY - rect.top) / scale
    };
  };

  const startDrawing = (e) => {
    if (!isBrushMode) return;
    const { x, y } = getCoordinates(e);
    setIsDrawing(true);
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
    ctxRef.current.lineWidth = brushSize;
    
    const newPaths = paths.slice(0, step);
    newPaths.push([{ x, y, brushSize }]);
    setPaths(newPaths);
  };

  const continueDrawing = (e) => {
    if (!isDrawing) return;
    const { x, y } = getCoordinates(e);
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();

    const currentPaths = [...paths];
    currentPaths[step].push({ x, y, brushSize });
    setPaths(currentPaths);
  };

  const endDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    ctxRef.current.closePath();
    setStep(step + 1);
  };

  

  const saveAndUpload = async () => {
    setLoading(true);
    try {
      const canvas = canvasRef.current;
      canvas.toBlob(async (blob) => {
        const file = new File([blob], 'mask.png', { type: 'image/png' });
        const formData = new FormData();
        formData.append('gif', file); // 对应后端 single('gif') 或 any()
        formData.append("isMask", "true");
        formData.append("batchId", batchId || "");
        
        // 如果原图也是本地的，按之前的逻辑 fetch 后 append
        const res = await fetch(imgSrc);
        const originalBlob = await res.blob();
        formData.append('imgFile', new File([originalBlob], 'original.png'));

        await onUpload(formData);
        message.success('提交成功');
        setLoading(false);
      }, 'image/png');
    } catch (error) {
      setLoading(false);
      message.error('操作失败');
    }
  };

  return (
    <div className="editorBox flex flex-col items-center p-5 bg-gray-100 min-h-screen">
      <div 
        className="relative bg-white  shadow-lg mb-5"
        style={{ 
          width: canvasDims.width, 
          height: canvasDims.height,
          cursor: isBrushMode ? 'crosshair' : 'default'
        }}
      >
        <div style={{ 
          transform: `scale(${zoomVal / 100})`, 
          transformOrigin: 'center center', 
          transition: '0.1s linear',
          width: '100%',
          height: '100%'
        }}>
          <img
            src={imgSrc}
            alt="bg"
            style={{ 
                width: canvasDims.width, 
                height: canvasDims.height, 
                position: 'absolute',
                display: 'block' 
            }}
            draggable={false}
          />
          <canvas
            ref={canvasRef}
            width={canvasDims.width}
            height={canvasDims.height}
            className="absolute top-0 left-0"
            onMouseDown={startDrawing}
            onMouseMove={continueDrawing}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
          />
        </div>
      </div>

      <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-md">
        <Space className="mb-4 w-full justify-between">
          <Space>
            <Button type={isBrushMode ? 'primary' : 'default'} icon={<HighlightOutlined />} onClick={() => setIsBrushMode(true)}>{t('edit.brush')}</Button>
            <Button type={!isBrushMode ? 'primary' : 'default'} icon={<ZoomInOutlined />} onClick={() => setIsBrushMode(false)}>{t('edit.photo')} {t('edit.size')}</Button>
          </Space>
          <Button icon={<UndoOutlined />} onClick={() => {
              const next = Math.max(0, step - 1);
              setStep(next);
              reDraw(next);
          }} disabled={step === 0}>{t('edit.redo')}</Button>
        </Space>

        <div className="mb-6">
           {isBrushMode ? (
             <Slider min={1} max={100} value={brushSize} onChange={setBrushSize} />
           ) : (
             <Slider min={100} max={300} value={zoomVal} onChange={setZoomVal} />
           )}
        </div>

        <Button 
          type="primary" block size="large" icon={<CloudUploadOutlined />}
          loading={loading} onClick={saveAndUpload}
          style={{ backgroundColor: '#000' }}
        >
          {t('common.erase')}
        </Button>
      </div>
    </div>
  );
};

export default Editor;