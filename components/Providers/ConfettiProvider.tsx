"use client"

import ReactConfetti from 'react-confetti'

import { useConfettiStore } from '@/hooks/use-confetti-store'

const ConfettiProvider = () => {
  const confetti = useConfettiStore()

  if(!confetti.isOpen) return null

  return (
    <ReactConfetti 
      className='pointer-events-none z-[1000000000]'
      numberOfPieces={500}
      recycle={false}
      onConfettiComplete={() => confetti.onClose()}
    />
  )
}

export default ConfettiProvider