import { CreditCard } from "lucide-react"
import { motion } from "framer-motion"

export default function AnimatedTagline() {
  return (
    <motion.div 
      className="flex items-center justify-center gap-3 text-2xl font-light text-blue-400"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <motion.div
        className="flex items-center gap-3"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ 
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 2
        }}
      >
        <CreditCard className="w-8 h-8" />
        <span>Tap. Pay. Enjoy.</span>
      </motion.div>
    </motion.div>
  )
}