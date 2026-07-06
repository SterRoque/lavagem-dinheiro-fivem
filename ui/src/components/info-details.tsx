import { formatCurrency } from '../utils/format';

type InfoDetailsProps = {
   initialValue: number;
   rate: number;
};

export function InfoDetails({ initialValue, rate }: InfoDetailsProps) {
   const totalToReceive = initialValue * (1 - rate / 100);
   const taxAmount = (initialValue * rate) / 100;

   return (
      <div className='flex flex-col gap-2 font-medium text-white/50'>
         <div className='flex justify-between'>
            <p>Valor Inserido</p>
            <span className='font-bold text-white/80'>
               {formatCurrency(initialValue)}
            </span>
         </div>
         <div className='flex justify-between'>
            <p>Taxa cobrada</p>
            <span className='font-bold text-red-400'>
               - {formatCurrency(taxAmount)}
            </span>
         </div>
         <div className='flex justify-between'>
            <p>Total a receber</p>
            <span className='font-bold text-green-400'>
               {formatCurrency(totalToReceive)}
            </span>
         </div>
      </div>
   );
}
