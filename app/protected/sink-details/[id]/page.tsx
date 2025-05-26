import React from 'react'
import SinkDetailsContent from './SinkDetailsContent'
import Navbar from '@/app/component/Navbar'

interface Props {
  params: {
    id: string
  }
}

const SinkDetails = ({ params }: Props) => {
  const id = React.use(Promise.resolve(params.id))
  return (
    <>
      <Navbar />
      <SinkDetailsContent id={id} />
    </>
  )
}

export default SinkDetails 