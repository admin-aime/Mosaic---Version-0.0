import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useAssessment } from '../contexts/AssessmentContext'
import { 
  FileText, 
  BarChart3, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Target,
  Award,
  BookOpen
} from 'lucide-react'

function Dashboard() {
  const { user } = useAuth()
  const { assessmentHistory } = useAssessment()

  const completedAssessments = assessmentHistory.filter(a => a.completedAt)
  const inProgressAssessments = assessmentHistory.filter(a => !a.completedAt)
  const latestAssessment = completedAssessments[completedAssessments.length - 1]

  const stats = [
    {
      name: 'Assessments Completed',
      value: completedAssessments.length,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      name: 'In Progress',
      value: inProgressAssessments.length,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      name: 'Primary Archetype',
      value: latestAssessment?.results?.primary?.archetype || 'Not assessed',
      icon: Target,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50'
    },
    {
      name: 'Team Comparisons',
      value: '3 Available',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  const quickActions = [
    {
      name: 'Take Assessment',
      description: 'Complete your leadership profile assessment',
      href: '/assessment',
      icon: FileText,
      color: 'bg-primary-600'
    },
    {
      name: 'View Results',
      description: 'Analyze your leadership assessment results',
      href: '/results',
      icon: BarChart3,
      color: 'bg-green-600'
    },
    {
      name: 'Help Center',
      description: 'Get support and learn more about the platform',
      href: '/help',
      icon: BookOpen,
      color: 'bg-purple-600'
    }
  ]

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Here's an overview of your leadership development journey
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="card">
              <div className="flex items-center">
                <div className={`flex-shrink-0 ${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <Link
                    key={action.name}
                    to={action.href}
                    className="group relative bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className={`inline-flex p-3 rounded-lg ${action.color} text-white mb-4`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{action.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                    <div className="flex items-center text-primary-600 group-hover:text-primary-700">
                      <span className="text-sm font-medium">Get started</span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {completedAssessments.length > 0 ? (
                completedAssessments.slice(-3).reverse().map((assessment) => (
                  <div key={assessment.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        Assessment Completed
                      </p>
                      <p className="text-sm text-gray-600">
                        Primary: {assessment.results.primary.archetype}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(assessment.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No assessments yet</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Get started by taking your first leadership assessment.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/assessment"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                    >
                      <FileText className="-ml-1 mr-2 h-5 w-5" />
                      Take Assessment
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Latest Results Preview */}
          {latestAssessment && (
            <div className="card mt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Latest Results</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Primary</span>
                  <span className="text-sm font-medium text-gray-900">
                    {latestAssessment.results.primary.archetype}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Secondary</span>
                  <span className="text-sm font-medium text-gray-900">
                    {latestAssessment.results.secondary.archetype}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Score</span>
                  <span className="text-sm font-medium text-gray-900">
                    {latestAssessment.results.primary.score}/35
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <Link
                  to={`/results/${latestAssessment.id}`}
                  className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  View full results
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
