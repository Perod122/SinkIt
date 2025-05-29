'use client'

import React, { useEffect, useState } from 'react'
import { getContributions, getSinkingMemberById } from '@/app/SinkAction'
import { ArrowLeft, Loader2, AlertCircle, Calendar, DollarSign, User2Icon, PhilippinePeso } from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import LoadingSpinner from '@/app/component/LoadingSpinner'

interface Contribution {
  id: string
  contri_id: string
  amount: number
  date_paid: string
  created_at: string
  sink_term: string
}

interface Member {
  memberId: string
  first_name: string
  lastName: string | null
}

interface Props {
  sinkId: string
  memberId: string
}

const MemberContributionsContent = ({ sinkId, memberId }: Props) => {
  const router = useRouter()
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [member, setMember] = useState<Member[]>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        setLoading(true)
        setError(null)
        const memberData = await getSinkingMemberById(memberId)
        setMember(memberData || [])
        const data = await getContributions(memberId, sinkId)
        setContributions(data || [])
      } catch (err) {
        setError('Failed to load contributions')
        console.error('Error fetching contributions:', err)
        toast.error('Failed to load contributions')
      } finally {
        setLoading(false)
      }
    }

    fetchContributions()
  }, [memberId, sinkId])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <LoadingSpinner 
        title="Loading Contributions"
        description="Please wait while we fetch your contributions"
        className="min-h-screen"
        size="lg"
      />
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-red-900 mb-2">Error Loading Contributions</h3>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const totalAmount = contributions.reduce((sum, contribution) => sum + contribution.amount, 0)

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-gray-600 hover:bg-gray-300 p-3 rounded-full hover:text-gray-800 font-medium gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Fund Details
        </button>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-50 rounded-full">
              <User2Icon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Member Name</div>
              <div className="text-xl font-bold text-gray-900">
                {member && member[0] ? `${member[0].first_name} ${member[0].lastName || ''}` : 'Unknown Member'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 rounded-full">
              <PhilippinePeso className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Contributions</div>
              <div className="text-xl font-bold text-gray-900">
                ₱{totalAmount.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 rounded-full">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Number of Contributions</div>
              <div className="text-xl font-bold text-gray-900">
                {contributions.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contributions Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Contribution History</h2>
        </div>

        {contributions.length === 0 ? (
          <div className="text-center py-12">
            <PhilippinePeso className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="text-sm font-medium text-gray-900">No Contributions Yet</h3>
            <p className="text-sm text-gray-500 mt-1">
              This member hasn't made any contributions yet
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Paid
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Added On
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {contributions.map((contribution) => (
                  <tr key={contribution.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(contribution.date_paid)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ₱{contribution.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {formatDate(contribution.created_at)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default MemberContributionsContent 