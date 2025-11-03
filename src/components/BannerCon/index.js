'use client';
import './index.css';
export default function EditBanner( {data} ) {
  if (!data) return null;

  const { title, arr = [] } = data;

  return (
    <div className="bannerCon">
      <h1 className="bannerTitle">{title}</h1>
      {arr.length > 0 && (
        <div className="tipBox">
          {arr.map((text, idx) => (
            <div className="tip" key={idx}>{text}</div>
          ))}
        </div>
      )}
    </div>
  );
}