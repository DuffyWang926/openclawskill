async function getLightFingerprint() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // 1. Canvas 绘制特定图案
    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125,1,62,20);
    ctx.fillStyle = "#069";
    ctx.fillText("Hello, world!", 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText("Hello, world!", 4, 17);
    
    // 导出 Base64 (包含硬件渲染差异)
    const canvasData = canvas.toDataURL();

    // 2. 获取 User-Agent
    const ua = navigator.userAgent;

    const canvasId = canvasData.slice(-50)

    // 3. 将两者组合发送
    return { 
        canvasId,
        ua
    }
}
export { getLightFingerprint }