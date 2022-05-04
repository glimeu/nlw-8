import html2canvas from 'html2canvas';
import { Camera, Trash } from 'phosphor-react';
import { useState } from 'react';
import { Loading } from '../Loading';

type ScreenshotButtonProps = {
  screenshot: string | null;
  onScreenshotTook: (screenshot: string | null) => void;
};

export const ScreenshotButton = ({ screenshot, onScreenshotTook }: ScreenshotButtonProps) => {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);

    const canvas = await html2canvas(document.querySelector('html')!);
    const base64image = canvas.toDataURL('image/png');

    onScreenshotTook(base64image);
    setIsTakingScreenshot(false);
  }

  if (screenshot) {
    return (
      <button
        type="button"
        onClick={() => onScreenshotTook(null)}
        className="flex items-end justify-end w-10 h-10 p-1 transition-colors border-transparent rounded text-zinc-400 hover:text-zinc-100"
        style={{ backgroundImage: `url(${screenshot})` }}
      >
        <Trash weight="fill" className="w-4 h-4" />
      </button>
    );
  }

  return (
    <button
      type="button"
      className="p-2 transition-colors bg-transparent rounded bg-zinc-800 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
      onClick={handleTakeScreenshot}
    >
      {isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6" />}
    </button>
  );
};
