import { WavesIcon } from 'lucide-react';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'hsl(222 47% 11%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
        }}
      >
        <WavesIcon color='hsl(222 100% 68%)' />
      </div>
    ),
    {
      ...size,
    }
  );
}
