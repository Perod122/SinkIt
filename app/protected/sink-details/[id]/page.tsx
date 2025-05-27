import React from 'react'
import SinkDetailsContent from './SinkDetailsContent'
import Navbar from '@/app/component/Navbar'

interface Props {
  params: {
    id: string
  }
}

async function SinkDetails({ params }: Props) {
  return (
    <>
      <Navbar />
      <SinkDetailsContent id={params.id} />
    </>
  )
}

export default SinkDetails 