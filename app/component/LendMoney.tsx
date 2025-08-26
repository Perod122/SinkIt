'use client'

import React, { useState } from 'react'
import { X } from 'lucide-react'
import { lendMoney } from '../SinkAction'

interface LendMoneyProps {
  onClose: () => void
  onSuccess?: () => void
  sinkId: string // for Brrwd_SinkingID
  members: Array<{
    id: string
    first_name: string
    lastName: string | null
  }> // for borrower selection
}

const LendMoney: React.FC<LendMoneyProps> = ({ onClose, onSuccess, sinkId, members }) => {
  const [formData, setFormData] = useState({
    borrower_id: '',
    amount: '',
    interest: '',
    Months: '1',
    payable: '',
    Brrwd_SinkingID: ''
  })

  // Calculate payable amount when amount, interest, or months changes
  const calculatePayable = (amount: string, interest: string, months: string) => {
    if (!amount || !interest || !months) return ''
    const loanAmount = parseFloat(amount)
    const interestRate = parseFloat(interest)
    const numMonths = parseInt(months)
    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(numMonths)) return ''
    
    const interestAmount = loanAmount * (interestRate / 100)
    const totalPayable = loanAmount + interestAmount
    const monthlyPayment = totalPayable / numMonths
    return monthlyPayment.toFixed(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const form = new FormData()
      form.append('borrower_id', formData.borrower_id)
      form.append('amount', formData.amount)
      form.append('interest', formData.interest)
      form.append('Months', formData.Months) // This will only send the number
      form.append('payable', formData.payable.split(' ')[0].replace('₱', '')) // Remove ₱ symbol and everything after the amount
      form.append('Brrwd_SinkingID', sinkId)
    
      const response = await lendMoney(form)
      console.log('Loan recorded successfully:', response)
      onSuccess?.()
      onClose()
    } catch (error) {
      console.error('Error lending money:', error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Lend Money</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Borrower Select */}
          <div>
            <label htmlFor="borrower_id" className="block text-sm font-medium text-gray-700 mb-2">
              Borrower's Name
            </label>
            <select
              id="borrower_id"
              value={formData.borrower_id}
              onChange={(e) => setFormData({ ...formData, borrower_id: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select a borrower</option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.first_name} {member.lastName || ''}
                </option>
              ))}
            </select>
          </div>

          {/* Amount Input */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Loan Amount (₱)
            </label>
            <input
              type="number"
              id="amount"
              value={formData.amount}
              onChange={(e) => {
                const newAmount = e.target.value
                const newPayable = calculatePayable(newAmount, formData.interest, formData.Months)
                setFormData({ ...formData, amount: newAmount, payable: newPayable })
              }}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Interest Input */}
          <div>
            <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
              Interest Rate (%)
            </label>
            <input
              id="interest"
              type="number"
              value={formData.interest}
              onChange={(e) => {
                const newInterest = e.target.value
                const newPayable = calculatePayable(formData.amount, newInterest, formData.Months)
                setFormData({ ...formData, interest: newInterest, payable: newPayable })
              }}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
              step="0.1"
              required
            />
          </div>

          {/* Payment Type Select */}
          <div>
            <label htmlFor="Months" className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Payment
            </label>
            <select
              id="Months"
              value={formData.Months}
              onChange={(e) => {
                const newMonths = e.target.value
                const newPayable = calculatePayable(formData.amount, formData.interest, newMonths)
                setFormData({ ...formData, Months: newMonths, payable: newPayable })
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="1">1 Month</option>
              <option value="3">3 Months</option>
              <option value="6">6 Months</option>
              <option value="9">9 Months</option>
            </select>
          </div>

          {/* Payable Amount */}
          <div>
            <label htmlFor="payable" className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Payment Amount (₱)
            </label>
            <input
              type="text"
              id="payable"
              value={formData.payable ? `₱${formData.payable} x ${formData.Months} Months` : ''}
              readOnly
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LendMoney
