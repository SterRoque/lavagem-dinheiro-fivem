type CardProps = {
   title: string;
   value: string;
   icon: React.ReactNode;
};

export function Card({ title, value, icon }: CardProps) {
   return (
      <div className='flex w-full items-center justify-center gap-3 rounded-2xl border border-white/20 bg-neutral-700/50 p-2'>
         {icon}
         <div>
            <span className='text-[10px] font-medium text-white/50 uppercase'>
               {title}
            </span>
            <p className='font-bold text-white'>{value}</p>
         </div>
      </div>
   );
}
