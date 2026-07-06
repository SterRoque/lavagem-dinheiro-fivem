type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
   label: string;
};
export function Input({ label, ...rest }: InputProps) {
   return (
      <div>
         <span className='text-sm font-medium text-white/60'>{label}</span>
         <div className='mt-1 h-8 rounded-md border border-white/20'>
            <span className='ml-3 text-sm font-bold text-white'>R$</span>
            <input
               className='h-full w-[80%] pl-4 text-xs text-white focus:outline-none'
               {...rest}
            />
            <button className='h-5 w-[10%] cursor-pointer rounded-md text-xs font-bold text-white'>
               MAX
            </button>
         </div>
      </div>
   );
}
