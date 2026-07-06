import { useEffect, useState } from 'react';
import { TbClockHour4 } from 'react-icons/tb';

type WashingScreenProps = {
   duration?: number;
   onReceive: () => void;
};

function formatTime(totalSeconds: number): string {
   const hours = Math.floor(totalSeconds / 3600);
   const minutes = Math.floor((totalSeconds % 3600) / 60);
   const seconds = totalSeconds % 60;

   const pad = (value: number) => String(value).padStart(2, '0');

   return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function WashingScreen({ duration = 30, onReceive }: WashingScreenProps) {
   const [remaining, setRemaining] = useState(duration);

   useEffect(() => {
      if (remaining <= 0) return;

      const interval = setInterval(() => {
         setRemaining((prev) => (prev <= 1 ? 0 : prev - 1));
      }, 1000);

      return () => clearInterval(interval);
   }, [remaining]);

   const isFinished = remaining <= 0;

   return (
      <div className='flex h-100 w-100 flex-col items-center justify-center rounded-2xl bg-neutral-800 p-6'>
         <h1 className='text-center text-xl font-bold text-white/80 uppercase'>
            Lavando Dinheiro
         </h1>

         <div className='mt-8 flex h-24 w-24 items-center justify-center rounded-full border-4 border-green-400/40 text-green-400'>
            <TbClockHour4 size={48} />
         </div>

         <p className='mt-6 font-mono text-4xl font-bold tracking-widest text-white tabular-nums'>
            {formatTime(remaining)}
         </p>

         <p className='mt-3 text-sm font-medium text-white/50'>
            {isFinished
               ? 'Lavagem concluída!'
               : 'Aguarde enquanto o dinheiro é lavado...'}
         </p>

         <button
            onClick={onReceive}
            disabled={!isFinished}
            className='mt-8 w-full rounded-md py-3 text-sm font-bold uppercase transition-colors enabled:cursor-pointer enabled:bg-green-400 disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-white/40'
         >
            Receber Dinheiro
         </button>
      </div>
   );
}
