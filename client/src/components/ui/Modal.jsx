import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
export default function Modal({ open, onClose, title, children, size='md' }) {
  const sizes = { sm:'max-w-sm', md:'max-w-md', lg:'max-w-lg', xl:'max-w-xl' }
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{background:'rgba(0,0,0,0.75)'}} onClick={onClose}>
          <motion.div initial={{scale:0.95,opacity:0,y:20}} animate={{scale:1,opacity:1,y:0}} exit={{scale:0.95,opacity:0,y:20}}
            className={`card w-full ${sizes[size]}`} onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">{title}</h3>
              <button onClick={onClose} className="text-text-secondary hover:text-text-primary transition-colors"><X size={20}/></button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
