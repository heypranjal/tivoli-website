/**
 * Admin Dashboard Component
 * Phase 1: Foundation Setup
 * Created: 2025-06-20
 * 
 * Main admin dashboard with stats and quick actions
 */

import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Building2, 
  MapPin, 
  Tag, 
  Image, 
  TrendingUp,
  Plus,
  Eye
} from 'lucide-react'
import { useHotelStats } from '@/hooks/useHotels'
import { useBrands } from '@/hooks/useBrands'
import { useLocations } from '@/hooks/useLocations'

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color = 'blue',
  href 
}: {
  title: string
  value: number | string
  icon: React.ElementType
  color?: 'blue' | 'green' | 'purple' | 'orange'
  href?: string
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200'
  }

  const content = (
    <div className={`p-6 rounded-lg border ${colorClasses[color]} transition-colors hover:bg-opacity-80`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-75">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <Icon className="w-8 h-8 opacity-75" />
      </div>
    </div>
  )

  return href ? <Link to={href}>{content}</Link> : content
}

export default function AdminDashboard() {
  const hotelStats = useHotelStats()
  const { data: brands } = useBrands()
  const { data: locations } = useLocations()

  const quickActions = [
    {
      title: 'Add New Hotel',
      description: 'Create a new hotel property',
      href: '/admin/hotels/new',
      icon: Plus,
      color: 'green' as const
    },
    {
      title: 'Manage Media',
      description: 'Upload and organize images',
      href: '/admin/media',
      icon: Image,
      color: 'purple' as const
    },
    {
      title: 'View Website',
      description: 'Preview the live website',
      href: '/',
      icon: Eye,
      color: 'blue' as const
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Overview of your Tivoli Hotels management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Hotels"
          value={hotelStats.total}
          icon={Building2}
          color="blue"
          href="/admin/hotels"
        />
        <StatCard
          title="Brands"
          value={brands?.length || 0}
          icon={Tag}
          color="green"
          href="/admin/brands"
        />
        <StatCard
          title="Locations"
          value={locations?.length || 0}
          icon={MapPin}
          color="purple"
          href="/admin/locations"
        />
        <StatCard
          title="Featured Hotels"
          value={hotelStats.featured}
          icon={TrendingUp}
          color="orange"
        />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            return (
              <Link
                key={action.href}
                to={action.href}
                className="p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    action.color === 'green' ? 'bg-green-100 text-green-600' :
                    action.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Hotels by Brand */}
      {Object.keys(hotelStats.byBrand).length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Hotels by Brand</h2>
          <div className="space-y-3">
            {Object.entries(hotelStats.byBrand).map(([brand, count]) => (
              <div key={brand} className="flex items-center justify-between">
                <span className="text-gray-700">{brand}</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                  {count} hotel{count !== 1 ? 's' : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hotels by Location */}
      {Object.keys(hotelStats.byLocation).length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Hotels by Location</h2>
          <div className="space-y-3">
            {Object.entries(hotelStats.byLocation).map(([location, count]) => (
              <div key={location} className="flex items-center justify-between">
                <span className="text-gray-700">{location}</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                  {count} hotel{count !== 1 ? 's' : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}