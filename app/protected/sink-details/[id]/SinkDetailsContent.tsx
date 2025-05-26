'use client'

import React, { useEffect, useState } from 'react'
import { getSinkingById, getSinkingMembers, deleteSinkingMember } from '@/app/SinkAction'
import { ArrowLeft, Calendar, DollarSign, Users, Trash2, UserPlus, Loader2, AlertCircle, PlusCircleIcon, HandCoins, EyeIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import AddSinkingMember from '@/app/component/AddSinkingMember'
import toast from 'react-hot-toast'
import AddContribution from '@/app/component/AddContribution'

interface SinkingFund {
  id: string
  start_date: string
  end_date: string
  payment_type: string
  amount: number
  created_at?: string
}

interface SinkingMember {
  id: string
  sink_id: string
  first_name: string
  lastName: string | null
  count: number
  created_at: string
}

interface Props {
  id: string
}

const SinkDetailsContent = ({ id }: Props) => {
  const router = useRouter()
  const [fund, setFund] = useState<SinkingFund | null>(null)
  const [members, setMembers] = useState<SinkingMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAddMember, setShowAddMember] = useState(false)
  const [deletingMemberId, setDeletingMemberId] = useState<string | null>(null)
  const [showAddContribution, setShowAddContribution] = useState(false)
  const [selectedMember, setSelectedMember] = useState<SinkingMember | null>(null)

  const fetchMembers = async () => {
    try {
      const data = await getSinkingMembers(id)
      setMembers(data || [])
    } catch (err) {
      console.error('Error fetching members:', err)
      toast.error('Failed to load members')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const fundData = await getSinkingById(id)
        if (!fundData || fundData.length === 0) {
          setError('Sinking fund not found')
          return
        }
        setFund(fundData[0])
        await fetchMembers()
      } catch (err) {
        setError('Failed to load sinking fund details')
        console.error('Error fetching sinking fund details:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleDeleteMember = async (memberId: string) => {
    if (!confirm('Are you sure you want to delete this member?')) return

    try {
      setDeletingMemberId(memberId)
      await deleteSinkingMember(memberId)
      toast.success('Member deleted successfully')
      await fetchMembers()
    } catch (error) {
      console.error('Error deleting member:', error)
      toast.error('Failed to delete member')
    } finally {
      setDeletingMemberId(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleAddContribution = (member: SinkingMember) => {
    setSelectedMember(member)
    setShowAddContribution(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Loading Fund Details</h3>
          <p className="text-sm text-gray-500">Please wait...</p>
        </div>
      </div>
    )
  }

  if (error || !fund) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-red-900 mb-2">Error Loading Fund</h3>
          <p className="text-red-600 mb-6">{error}</p>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Sinking Funds
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-gray-600 hover:text-gray-800 font-medium gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Sinking Funds
        </button>
      </div>

      {/* Main Content */}
      <div className="grid gap-6">
        {/* Fund Details Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Amount and Payment Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="w-8 h-8 text-green-600" />
                <div>
                  <div className="text-sm text-gray-500">Total Amount</div>
                  <div className="text-3xl font-bold text-gray-900">
                    ₱{fund.amount.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Payment Method</div>
                  <div className="font-medium text-gray-900">{fund.payment_type}</div>
                </div>
              </div>
            </div>

            {/* Right Column - Dates */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-500">Timeline</div>
                  <div className="text-lg font-medium text-gray-900">Payment Schedule</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">Start Date</div>
                  <div className="font-medium text-gray-900">{formatDate(fund.start_date)}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-sm text-gray-500 mb-1">End Date</div>
                  <div className="font-medium text-gray-900">{formatDate(fund.end_date)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Members Section */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Members</h2>
                <span className="ml-2 text-sm text-gray-500">
                  ({members.length} {members.length === 1 ? 'member' : 'members'})
                </span>
              </div>
              <button
                onClick={() => setShowAddMember(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <UserPlus className="w-4 h-4" />
                Add Member
              </button>
            </div>
          </div>

          {members.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-sm font-medium text-gray-900">No Members Yet</h3>
              <p className="text-sm text-gray-500 mt-1">
                Add members to start tracking contributions
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Count
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Added
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {members.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {member.first_name} {member.lastName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{member.count || 0}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {formatDate(member.created_at)}
                        </div>
                      </td>
                      <td className="px-6 space-x-2 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => handleAddContribution(member)}
                          className="text-green-600 hover:text-green-900 transition-colors"
                          title="Add contribution"
                        >
                          <HandCoins className="w-6 h-6" />
                        </button>
                        <button
                        className="text-cyan-600 hover:text-cyan-900 transition-colors">
                            <EyeIcon className="w-6 h-6" />
                        </button>
                        <button
                          onClick={() => handleDeleteMember(member.id)}
                          disabled={deletingMemberId === member.id}
                          className="text-red-600 hover:text-red-900 disabled:opacity-50 transition-colors"
                          title="Delete member"
                        >
                          <Trash2 className="w-6 h-6" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddMember && (
        <AddSinkingMember
          sinkId={id}
          onClose={() => setShowAddMember(false)}
          onSuccess={fetchMembers}
        />
      )}

      {/* Add Contribution Modal */}
      {showAddContribution && selectedMember && (
        <AddContribution
          memberId={selectedMember.id}
          sinkId={id}
          memberName={`${selectedMember.first_name} ${selectedMember.lastName || ''}`}
          onClose={() => {
            setShowAddContribution(false)
            setSelectedMember(null)
          }}
          onSuccess={fetchMembers}
        />
      )}
    </div>
  )
}

export default SinkDetailsContent 