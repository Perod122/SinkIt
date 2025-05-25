'use client'
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { getSinking } from '@/app/SinkAction'
import { RefreshCcw } from 'lucide-react'

interface SinkingFund {
  id: string
  start_date: string
  end_date: string
  payment_type: string
  amount: number
  created_at?: string
}

export interface SinkingListRef {
  refresh: () => void
}

const SinkingList = forwardRef<SinkingListRef>((props, ref) => {
  const [sinkingFunds, setSinkingFunds] = useState<SinkingFund[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSinkingFunds = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getSinking()
      setSinkingFunds(data || [])
    } catch (err) {
      setError('Failed to load sinking funds')
      console.error('Error fetching sinking funds:', err)
    } finally {
      setLoading(false)
    }
  }

  useImperativeHandle(ref, () => ({
    refresh: fetchSinkingFunds
  }))

  useEffect(() => {
    fetchSinkingFunds()
  }, [])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const calculateProgress = (startDate: string, endDate: string) => {
    const now = new Date()
    const start = new Date(startDate)
    const end = new Date(endDate)
    
    if (now < start) return 0
    if (now > end) return 100
    
    const totalDuration = end.getTime() - start.getTime()
    const elapsed = now.getTime() - start.getTime()
    
    return Math.round((elapsed / totalDuration) * 100)
  }

  const getDaysRemaining = (endDate: string) => {
    const now = new Date()
    const end = new Date(endDate)
    const diffTime = end.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) return 'Completed'
    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return '1 day left'
    return `${diffDays} days left`
  }

  const getPaymentTypeColor = (paymentType: string) => {
    switch (paymentType) {
      case 'Monthly': return 'bg-blue-100 text-blue-800'
      case 'Weekly': return 'bg-green-100 text-green-800'
      case 'Yearly': return 'bg-purple-100 text-purple-800'
      case 'One-time': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Your Sinking Funds</h2>
          <button
            onClick={fetchSinkingFunds}
            disabled={loading}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium disabled:opacity-50"
          >
            <RefreshCcw className="w-6 h-6"/>
          </button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-3"></div>
              <div className="h-6 bg-gray-200 rounded mb-3"></div>
              <div className="h-3 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-4"></div>
              <div className="h-2 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 text-lg font-medium mb-2">Error Loading Sinking Funds</div>
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchSinkingFunds}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (sinkingFunds.length === 0) {
    return (
      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
        <div className="text-gray-400 text-6xl mb-4">💰</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Sinking Funds Yet</h3>
        <p className="text-gray-500 mb-4">
          Start building your financial future by creating your first sinking fund.
        </p>
        <p className="text-sm text-gray-400">
          Click "Add Sinking Fund" above to get started!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Your Sinking Funds</h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            {sinkingFunds.length} Sinking Fund{sinkingFunds.length !== 1 ? 's' : ''}
          </div>
          <button
            onClick={fetchSinkingFunds}
            disabled={loading}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium disabled:opacity-50 transition-colors"
          >
            <RefreshCcw className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sinkingFunds.map((fund) => {
          const progress = calculateProgress(fund.start_date, fund.end_date)
          const daysRemaining = getDaysRemaining(fund.end_date)
          const isCompleted = progress >= 100

          return (
            <div
              key={fund.id}
              className={`bg-white rounded-lg shadow-md border-2 p-6 transition-all hover:shadow-lg ${
                isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPaymentTypeColor(fund.payment_type)}`}>
                    {fund.payment_type}
                  </div>
                </div>
                {isCompleted && (
                  <div className="text-green-600 text-xl">✓</div>
                )}
              </div>

              {/* Amount */}
              <div className="mb-4">
                <div className="text-2xl font-bold text-gray-900">
                    ₱{fund.amount}
                </div>
                <div className="text-sm text-gray-500">
                  Amount to Pay
                </div>
              </div>

              {/* Dates */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Start:</span>
                  <span className="font-medium text-gray-900">{formatDate(fund.start_date)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">End:</span>
                  <span className="font-medium text-gray-900">{formatDate(fund.end_date)}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Progress</span>
                  <span className={`font-medium ${isCompleted ? 'text-green-600' : 'text-blue-600'}`}>
                    {progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isCompleted ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Days Remaining */}
              <div className="text-center">
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                  isCompleted 
                    ? 'bg-green-100 text-green-800' 
                    : daysRemaining === 'Today'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {daysRemaining}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary Statistics */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {sinkingFunds.length}
            </div>
            <div className="text-sm text-gray-600">Total Funds</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(sinkingFunds.reduce((sum, fund) => sum + fund.amount, 0))}
            </div>
            <div className="text-sm text-gray-600">Total Target</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {sinkingFunds.filter(fund => calculateProgress(fund.start_date, fund.end_date) >= 100).length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {sinkingFunds.filter(fund => calculateProgress(fund.start_date, fund.end_date) < 100).length}
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default SinkingList 