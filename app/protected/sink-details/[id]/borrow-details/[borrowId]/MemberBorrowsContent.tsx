'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Calendar, DollarSign, User, AlertCircle, PhilippinePeso, Clock, Percent } from 'lucide-react'
import LoadingSpinner from '@/app/component/LoadingSpinner'
import toast from 'react-hot-toast'

interface BorrowDetails {
  id: string
  borrower_id: string
  amount: number
  interest: number
  pay_type: string
  payable: number
  created_at: string
  Brrwd_SinkingID: string
}

interface MemberDetails {
  id: string
  first_name: string
  lastName: string | null
}

interface Props {
  sinkId: string
  memberId: string
  borrowId: string
}

const MemberBorrowsContent = ({ sinkId, memberId, borrowId }: Props) => {
  const router = useRouter()
  const [borrowDetails, setBorrowDetails] = useState<BorrowDetails | null>(null)
  const [memberDetails, setMemberDetails] = useState<MemberDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // TODO: Implement actual API calls
        // const borrowData = await getBorrowDetails(borrowId)
        // const memberData = await getMemberDetails(memberId)
        
        // Mock data for now
        setBorrowDetails({
          id: borrowId,
          borrower_id: memberId,
          amount: 5000,
          interest: 20,
          pay_type: '3',
          payable: 1833.33,
          created_at: new Date().toISOString(),
          Brrwd_SinkingID: sinkId
        })
        
        setMemberDetails({
          id: memberId,
          first_name: 'John',
          lastName: 'Doe'
        })
      } catch (err) {
        setError('Failed to load borrow details')
        console.error('Error fetching borrow details:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [borrowId, memberId, sinkId])

  if (loading) {
    return (
      <LoadingSpinner 
        title="Loading Borrow Details"
        description="Please wait while we fetch the borrowing information"
        className="min-h-screen"
        size="lg"
      />
    )
  }

  if (error || !borrowDetails || !memberDetails) {
    return (
      <div className="mt-28 flex items-center justify-center p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-red-900 mb-2">Error Loading Details</h3>
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
    <div className="max-w-4xl mx-auto p-6">
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

      {/* Main Content */}
      <div className="grid gap-6">
        {/* Borrow Details Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Borrow Details</h2>
          
          {/* Member Info */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900">Borrower Information</h3>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {memberDetails.first_name} {memberDetails.lastName}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Loan Amount */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <PhilippinePeso className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-base font-semibold text-gray-900">Loan Amount</h3>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                ₱{borrowDetails.amount.toLocaleString()}
              </div>
            </div>

            {/* Interest & Payment */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Percent className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-base font-semibold text-gray-900">Interest & Terms</h3>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="text-sm text-gray-600">Interest Rate</div>
                  <div className="text-xl font-bold text-gray-900">{borrowDetails.interest}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Payment Terms</div>
                  <div className="text-xl font-bold text-gray-900">{borrowDetails.pay_type} Months</div>
                </div>
              </div>
            </div>

            {/* Monthly Payment */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-base font-semibold text-gray-900">Monthly Payment</h3>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                ₱{borrowDetails.payable.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Loan Date */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div>
                <div className="text-sm text-gray-600">Loan Date</div>
                <div className="text-lg font-semibold text-gray-900">
                  {formatDateTime(borrowDetails.created_at)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment History Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment History</h2>
          <div className="text-center py-12">
            <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-sm font-medium text-gray-900">No Payments Yet</h3>
            <p className="text-sm text-gray-500 mt-1">
              Payment history will appear here once payments are made
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberBorrowsContent