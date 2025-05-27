import React from 'react'
import SinkDetailsContent from './SinkDetailsContent'
import Navbar from '@/app/component/Navbar'

interface Props {
  params: {
    id: string
  }
}

async function SinkDetails({ params }: Props) {
  const {id} = await params
  return (
    <>
      <Navbar />
      <SinkDetailsContent id={id} />
    </>
  )
}

export default SinkDetails 