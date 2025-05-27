import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  title?: string
  description?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

const LoadingSpinner = ({
  title = 'Loading...',
  description = 'Please wait while we load your content',
  className = '',
  size = 'md'
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className={`min-h-[400px] flex items-center justify-center ${className}`}>
      <div className="text-center space-y-4">
        <div className="relative">
          <Loader2 
            className={`${sizeClasses[size]} animate-spin text-blue-600 mx-auto`} 
          />
          <div className="absolute inset-0 -z-10 animate-pulse">
            <div className={`${sizeClasses[size]} rounded-full bg-blue-100 mx-auto`} />
          </div>
        </div>
        {title && (
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        )}
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
      </div>
    </div>
  )
}

export default LoadingSpinner 