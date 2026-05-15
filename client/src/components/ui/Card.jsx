import { motion } from 'framer-motion'
export default function Card({ children, className='', elevated=false, onClick }) {
  return (
    <motion.div className={`${elevated?'card-elevated':'card'} ${className} ${onClick?'cursor-pointer':''}`}
      whileHover={onClick?{ scale:1.01, borderColor:'#3a3a5d' }:{}} onClick={onClick}>
      {children}
    </motion.div>
  )
}
