import Link from 'next/link';

export default function DashboardPage() {
  // Mock data - in a real app, this would come from your API
  const stats = [
    { label: 'Total Users', value: '2,543', icon: '👥', color: 'bg-blue-500' },
    { label: 'Active Users', value: '1,892', icon: '✅', color: 'bg-green-500' },
    { label: 'Pending Users', value: '156', icon: '⏳', color: 'bg-yellow-500' },
    { label: 'Inactive Users', value: '495', icon: '🚫', color: 'bg-red-500' },
  ];

  const quickActions = [
    {
      title: 'Add New User',
      description: 'Create a new user account',
      href: '/users',
      icon: '➕',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'View All Users',
      description: 'Browse and manage existing users',
      href: '/users',
      icon: '📋',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'User Roles',
      description: 'Manage user permissions and roles',
      href: '/users',
      icon: '🔐',
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      title: 'Reports',
      description: 'View user analytics and reports',
      href: '/users',
      icon: '📊',
      color: 'bg-orange-600 hover:bg-orange-700'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to User Management
        </h1>
        <p className="text-gray-600">
          Manage your users efficiently with our comprehensive user management system.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className={`shrink-0 w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                {stat.icon}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className={`${action.color} text-white rounded-lg p-4 transition-colors duration-200 block`}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">{action.icon}</span>
                <div>
                  <h3 className="font-semibold">{action.title}</h3>
                  <p className="text-sm opacity-90">{action.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-lg mr-3">👤</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">New user registered</p>
              <p className="text-xs text-gray-500">john.doe@example.com • 2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-lg mr-3">🔄</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">User role updated</p>
              <p className="text-xs text-gray-500">jane.smith@example.com • 15 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-lg mr-3">🚫</span>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">User account deactivated</p>
              <p className="text-xs text-gray-500">bob.wilson@example.com • 1 hour ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}