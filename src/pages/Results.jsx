import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAssessment } from '../contexts/AssessmentContext'
import { 
  Download, 
  Share2, 
  TrendingUp, 
  Users, 
  Target,
  Award,
  BarChart3,
  ArrowLeft
} from 'lucide-react'
import RadarChart from '../components/RadarChart'
import ResultsAnalysis from '../components/ResultsAnalysis'

function Results() {
  const { assessmentId } = useParams()
  const { assessmentHistory, getAssessmentById, archetypeDefinitions, teamMembers } = useAssessment()
  const [selectedAssessment, setSelectedAssessment] = useState(null)
  const [selectedTeamMember, setSelectedTeamMember] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (assessmentId) {
      const assessment = getAssessmentById(assessmentId)
      setSelectedAssessment(assessment)
    } else {
      // Show latest completed assessment
      const completedAssessments = assessmentHistory.filter(a => a.completedAt)
      if (completedAssessments.length > 0) {
        setSelectedAssessment(completedAssessments[completedAssessments.length - 1])
      }
    }
  }, [assessmentId, assessmentHistory, getAssessmentById])

  const handleExportPDF = () => {
    // PDF export functionality would be implemented here
    alert('PDF export functionality would be implemented here')
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Target },
    { id: 'analysis', name: 'Detailed Analysis', icon: BarChart3 },
    { id: 'comparison', name: 'Team Comparison', icon: Users }
  ]

  if (!selectedAssessment || !selectedAssessment.results) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <BarChart3 className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No results available</h3>
            <p className="mt-1 text-sm text-gray-500">
              Complete an assessment to view your leadership profile results.
            </p>
            <div className="mt-6">
              <Link
                to="/assessment"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
              >
                Take Assessment
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const { results } = selectedAssessment
  const completedDate = new Date(selectedAssessment.completedAt).toLocaleDateString()

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-2">
                <Link
                  to="/dashboard"
                  className="flex items-center text-gray-500 hover:text-gray-700 mr-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Dashboard
                </Link>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Leadership Assessment Results</h1>
              <p className="mt-1 text-sm text-gray-600">
                Completed on {completedDate}
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleExportPDF}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Primary Archetype</h3>
                <p className="text-2xl font-bold text-green-600 mb-1">
                  {results.primary.archetype}
                </p>
                <p className="text-sm text-gray-600">
                  Score: {results.primary.score}/35
                </p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Secondary Archetype</h3>
                <p className="text-2xl font-bold text-blue-600 mb-1">
                  {results.secondary.archetype}
                </p>
                <p className="text-sm text-gray-600">
                  Score: {results.secondary.score}/35
                </p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Development Area</h3>
                <p className="text-2xl font-bold text-gray-600 mb-1">
                  {results.lowest.archetype}
                </p>
                <p className="text-sm text-gray-600">
                  Score: {results.lowest.score}/35
                </p>
              </div>
            </div>

            {/* Radar Chart */}
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Leadership Profile</h2>
              <RadarChart 
                data={results.archetypeScores}
                comparisonData={selectedTeamMember ? teamMembers[selectedTeamMember].archetypeScores : null}
                comparisonName={selectedTeamMember ? teamMembers[selectedTeamMember].name : null}
              />
            </div>

            {/* Quick Insights */}
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h2>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-medium text-green-900 mb-2">Strengths</h3>
                  <p className="text-green-800 text-sm">
                    Your primary archetype is <strong>{results.primary.archetype}</strong>, indicating strong {archetypeDefinitions[results.primary.archetype.toLowerCase()]?.traits.slice(0, 2).join(' and ')} abilities.
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Secondary Strength</h3>
                  <p className="text-blue-800 text-sm">
                    Your secondary archetype <strong>{results.secondary.archetype}</strong> complements your primary style with {archetypeDefinitions[results.secondary.archetype.toLowerCase()]?.traits[0]} skills.
                  </p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h3 className="font-medium text-yellow-900 mb-2">Development Opportunity</h3>
                  <p className="text-yellow-800 text-sm">
                    Consider developing your <strong>{results.lowest.archetype}</strong> skills to become a more well-rounded leader.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <ResultsAnalysis assessment={selectedAssessment} />
        )}

        {activeTab === 'comparison' && (
          <div className="space-y-8">
            {/* Team Member Selection */}
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Compare with Team Members</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(teamMembers).map(([key, member]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedTeamMember(selectedTeamMember === key ? null : key)}
                    className={`p-4 border rounded-lg text-left transition-all ${
                      selectedTeamMember === key
                        ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <h3 className="font-medium text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{member.role}</p>
                    <p className="text-xs text-gray-500 mt-2">{member.profileSummary}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Comparison Chart */}
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Leadership Profile Comparison
                {selectedTeamMember && (
                  <span className="text-primary-600 ml-2">
                    vs {teamMembers[selectedTeamMember].name}
                  </span>
                )}
              </h2>
              <RadarChart 
                data={results.archetypeScores}
                comparisonData={selectedTeamMember ? teamMembers[selectedTeamMember].archetypeScores : null}
                comparisonName={selectedTeamMember ? teamMembers[selectedTeamMember].name : null}
              />
            </div>

            {/* Comparison Insights */}
            {selectedTeamMember && (
              <div className="card">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Comparison Insights with {teamMembers[selectedTeamMember].name}
                </h2>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-900 mb-2">Complementary Strengths</h3>
                    <p className="text-blue-800 text-sm">
                      Your leadership styles complement each other well, with different primary archetypes that can create a balanced team dynamic.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-medium text-green-900 mb-2">Collaboration Opportunities</h3>
                    <p className="text-green-800 text-sm">
                      Consider leveraging each other's strengths in projects that require both your primary archetypes.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Results
