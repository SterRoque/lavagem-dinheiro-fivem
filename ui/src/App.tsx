import { TbBriefcase2 } from 'react-icons/tb';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { Card } from './components/card';
import { Input } from './components/input';

function App() {
   return (
      <div className='flex h-screen items-center justify-center'>
         <div className='h-120 w-100 rounded-2xl bg-neutral-800 p-6'>
            <h1 className='text-center text-xl font-bold text-white/80 uppercase'>
               Sistema de Lavagem
            </h1>

            <div className='mt-3 flex justify-between gap-2'>
               <Card
                  title='Dinheiro sujo'
                  value='R$ 8000000'
                  icon={
                     <div className='flex h-8 w-8 items-center justify-center rounded-md bg-red-600/40 text-red-200'>
                        <TbBriefcase2 size={18} />
                     </div>
                  }
               />
               <Card
                  title='Taxa de serviço'
                  value='20%'
                  icon={
                     <div className='flex h-8 w-8 items-center justify-center rounded-md bg-amber-500/40 text-amber-200'>
                        <RiMoneyDollarCircleLine size={20} />
                     </div>
                  }
               />
            </div>

            <div className='mt-4'>
               <Input
                  label='Digite o valor que deseja lavar'
                  placeholder='0,00'
               />
            </div>
         </div>
      </div>
   );
}

export default App;
