'use client'
import Navbar from '@/app/component/Navbar'
import AddSinkingModal from '@/app/component/AddSinkingModal'
import SinkingList, { SinkingListRef } from '@/app/component/SinkingList'
import React, { useRef } from 'react'
import { Toaster } from 'react-hot-toast'

const Home = () => {
  const sinkingListRef = useRef<SinkingListRef>(null)

  const handleSinkingAdded = () => {
    sinkingListRef.current?.refresh()
  }

  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sinking Fund Manager</h1>
            <p className="text-gray-600 mb-6">
              Plan and track your financial goals with organized sinking funds
            </p>
            <AddSinkingModal onSinkingAdded={handleSinkingAdded} />
          </div>
          
          {/* Main Content */}
          <div className="space-y-8">
            <SinkingList ref={sinkingListRef} />
          </div>
          
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#fff',
                color: '#333',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              },
            }}
          />
        </div>
    </div>
  )
}

export default Home