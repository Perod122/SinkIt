'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Calendar, DollarSign, Users, AlertCircle, PhilippinePeso, Eye, Search, User } from 'lucide-react'
import LoadingSpinner from '@/app/component/LoadingSpinner'
import { getTotalBorrowedMoney } from '@/app/SinkAction'

interface BorrowRecord {
  id: string
  borrower_id: string
  amount: number
  interest: number
  Months: string
  payable: number
  created_at: string
  Brrwd_SinkingID: string
  borrower?: {
    first_name: string
    lastName: string | null
  }
}

interface Props {
  sinkId: string
}

const BorrowedMoneyContent = ({ sinkId }: Props) => {
  const router = useRouter()
  const [borrowRecords, setBorrowRecords] = useState<BorrowRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const filteredRecords = borrowRecords.filter(record => {
    if (!record.borrower) return false
    const fullName = `${record.borrower.first_name} ${record.borrower.lastName || ''}`.toLowerCase()
    return fullName.includes(searchTerm.toLowerCase())
  })

  const totalBorrowedAmount = borrowRecords.reduce((sum, record) => sum + record.amount, 0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const borrowData = await getTotalBorrowedMoney(sinkId)
        setBorrowRecords(borrowData || [])
      } catch (err) {
        setError('Failed to load borrowed money records')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [sinkId])

  if (loading) {
    return (
      <LoadingSpinner 
        title="Loading Borrowed Money"
        description="Please wait while we fetch the borrowed money records"
        className="min-h-screen"
        size="lg"
      />
    )
  }

  if (error) {
    return (
      <div className="mt-28 flex items-center justify-center p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-red-900 mb-2">Error Loading Records</h3>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-gray-600 hover:text-gray-800 hover:bg-gray-300 p-3 rounded-3xl font-medium gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Sink Details
        </button>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Borrowed Money Summary</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 p-2 rounded-lg">
                <PhilippinePeso className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">Total Borrowed</h3>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              ₱{totalBorrowedAmount.toLocaleString()}
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">Total Borrowers</h3>
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {borrowRecords.length}
            </div>
          </div>
        </div>
      </div>

      {/* Borrowed Money Records */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-semibold text-gray-900">Borrowed Money Records</h2>
              <span className="text-sm text-gray-500">({filteredRecords.length} of {borrowRecords.length})</span>
            </div>
            
            {/* Search Input */}
            <div className="relative flex-1 sm:flex-initial">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search borrowers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-gray-800 w-full sm:w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {filteredRecords.length === 0 ? (
          <div className="text-center py-12">
            {searchTerm ? (
              <>
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-sm font-medium text-gray-900">No Records Found</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Try adjusting your search terms
                </p>
              </>
            ) : (
              <>
                <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-sm font-medium text-gray-900">No Borrowed Money</h3>
                <p className="text-sm text-gray-500 mt-1">
                  No members have borrowed money yet
                </p>
              </>
            )}
          </div>
        ) : (
          <div>
            {/* Desktop view */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Borrower
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Interest
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Monthly Payment
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Terms
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8">
                            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                              <User className="h-4 w-4 text-gray-600" />
                            </div>
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {record.borrower?.first_name} {record.borrower?.lastName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">₱{record.amount.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{record.interest}%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-green-600">₱{record.payable.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{record.Months} Months</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{formatDate(record.created_at)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => router.push(`/protected/sink-details/${sinkId}/borrow-details/${record.id}`)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="View details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile view */}
            <div className="md:hidden space-y-4 px-4 py-2">
              {filteredRecords.map((record) => (
                <div key={record.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {record.borrower?.first_name} {record.borrower?.lastName}
                        </h3>
                        <p className="text-sm text-gray-500">{formatDateTime(record.created_at)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => router.push(`/protected/sink-details/${sinkId}/borrow-details/${record.id}`)}
                      className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600"
                      title="View details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Amount</p>
                      <p className="text-sm font-semibold text-gray-900">₱{record.amount.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Monthly Payment</p>
                      <p className="text-sm font-semibold text-green-600">₱{record.payable.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Interest</p>
                      <p className="text-sm text-gray-900">{record.interest}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Terms</p>
                      <p className="text-sm text-gray-900">{record.Months} Months</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BorrowedMoneyContent
