import { useEffect, useState } from 'react';
import { TbBriefcase2 } from 'react-icons/tb';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { Card } from './components/card';
import { Input } from './components/input';
import { InfoDetails } from './components/info-details';
import { WashingScreen } from './components/washing-screen';
import { fetchNui } from './utils/nui';
import { formatCurrency } from './utils/format';

const DIRTY_MONEY = 8000000;

function App() {
   const [isWashing, setIsWashing] = useState(false);
   const [value, setValue] = useState(0);
   const [visible, setVisible] = useState(false);
   const [fee, setFee] = useState(20);
   const [dirtyMoney, setDirtyMoney] = useState(0);

   function handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
      const onlyDigits = event.target.value.replace(/\D/g, '');
      const parsed = Number(onlyDigits);

      setValue(Math.min(parsed, DIRTY_MONEY));
   }

   function handleReceive() {
      fetchNui('wash', { amount: value });
      setIsWashing(false);
      setValue(0);
   }

   useEffect(() => {
      function handler(event: MessageEvent) {
         const { action, fee, dirtyMoney } = event.data;

         if (action === 'open') {
            setFee(fee);
            setDirtyMoney(0);
            setVisible(true);
         }

         if (action === 'close') {
            setVisible(false);
         }

         if (action === 'setDirty') {
            setDirtyMoney(dirtyMoney);
         }

         if (action === 'washResult') {
            setVisible(false);
         }
      }

      window.addEventListener('message', handler);

      return () => window.removeEventListener('message', handler);
   }, []);

   useEffect(() => {
      function onKey(event: KeyboardEvent) {
         if (event.key === 'Escape') fetchNui('close');
      }

      window.addEventListener('keydown', onKey);

      return () => window.removeEventListener('keydown', onKey);
   }, []);

   if (!visible) return null;

   return (
      <div className='flex h-screen items-center justify-center'>
         {isWashing ? (
            <WashingScreen
               duration={30}
               onReceive={handleReceive}
            />
         ) : (
            <div className='h-100 w-100 rounded-2xl bg-neutral-800 p-6'>
               <h1 className='text-center text-xl font-bold text-white/80 uppercase'>
                  Sistema de Lavagem
               </h1>

               <div className='mt-3 flex justify-between gap-2'>
                  <Card
                     title='Dinheiro sujo'
                     value={formatCurrency(dirtyMoney)}
                     icon={
                        <div className='flex h-8 w-8 items-center justify-center rounded-md bg-red-600/40 text-red-200'>
                           <TbBriefcase2 size={18} />
                        </div>
                     }
                  />
                  <Card
                     title='Taxa de serviço'
                     value={`${fee}%`}
                     icon={
                        <div className='flex h-8 w-8 items-center justify-center rounded-md bg-amber-500/40 text-amber-200'>
                           <RiMoneyDollarCircleLine size={20} />
                        </div>
                     }
                  />
               </div>

               <div className='my-4'>
                  <Input
                     label='Digite o valor que deseja lavar'
                     placeholder='0,00'
                     value={value === 0 ? '' : value.toLocaleString('pt-BR')}
                     onChange={handleValueChange}
                  />
               </div>

               <InfoDetails
                  initialValue={value}
                  rate={fee}
               />

               <button
                  onClick={() => setIsWashing(true)}
                  disabled={value <= 0}
                  className='mt-4 w-full rounded-md py-3 text-sm font-bold uppercase transition-colors enabled:cursor-pointer enabled:bg-green-400 disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-white/40'>
                  Lavar Dinheiro
               </button>
            </div>
         )}
      </div>
   );
}

export default App;
