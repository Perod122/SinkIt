'use client'
import Navbar from '@/app/component/Navbar'
import AddSinkingModal from '@/app/component/AddSinkingModal'
import SinkingList, { SinkingListRef } from '@/app/component/SinkingList'
import React, { useRef } from 'react'

const Home = () => {
  const sinkingListRef = useRef<SinkingListRef>(null)

  const handleSinkingAdded = () => {
    sinkingListRef.current?.refresh()
  }

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Main Content */}
          <div className="space-y-8">
        <AddSinkingModal onSinkingAdded={handleSinkingAdded} />
            <SinkingList ref={sinkingListRef} />
          </div>
          
          
        </div>
    </div>
  )
}

export default Home