/**
 * Admin Layout Component
 * Phase 1: Foundation Setup
 * Created: 2025-06-20
 * 
 * Basic admin interface layout for hotel management
 */

import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  Building2, 
  MapPin, 
  Image, 
  Settings, 
  Users,
  BarChart3,
  Tag
} from 'lucide-react'

interface AdminLayoutProps {
  children: React.ReactNode
}

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: BarChart3 },
  { href: '/admin/hotels', label: 'Hotels', icon: Building2 },
  { href: '/admin/brands', label: 'Brands', icon: Tag },
  { href: '/admin/locations', label: 'Locations', icon: MapPin },
  { href: '/admin/media', label: 'Media', icon: Image },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Home className="w-5 h-5 text-[#CD9F59]" />
                <span className="text-sm text-gray-600">Back to Website</span>
              </Link>
              <div className="w-px h-6 bg-gray-300" />
              <h1 className="text-xl font-semibold text-gray-900">
                Tivoli Hotels Admin
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Admin Panel
              </div>
              <div className="w-8 h-8 bg-[#CD9F59] rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Admin Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-6">
            <ul className="space-y-2">
              {adminNavItems.map((item) => {
                const isActive = location.pathname === item.href
                const Icon = item.icon
                
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-[#CD9F59] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </aside>

        {/* Admin Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}