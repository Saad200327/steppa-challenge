import { motion } from 'framer-motion'
export default function Button({ children, variant='primary', size='md', loading, disabled, className='', ...props }) {
  const base = 'btn'
  const variants = { primary:'btn-primary', danger:'btn-danger', ghost:'btn-ghost', 'outline-green':'btn-outline-green' }
  const sizes = { sm:'text-xs py-1.5 px-3', md:'', lg:'text-base py-3 px-6' }
  return (
    <motion.button whileTap={{ scale: 0.97 }}
      className={`${base} ${variants[variant]||''} ${sizes[size]||''} ${className} ${disabled||loading?'opacity-50 cursor-not-allowed':''}`}
      disabled={disabled||loading} {...props}>
      {loading && <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>}
      {children}
    </motion.button>
  )
}
