import React from 'react'
import { useAssessment } from '../contexts/AssessmentContext'
import { TrendingUp, TrendingDown, Minus, Target, Lightbulb, BookOpen } from 'lucide-react'

function ResultsAnalysis({ assessment }) {
  const { archetypeDefinitions } = useAssessment()
  const { results } = assessment

  const getScoreLevel = (score) => {
    if (score >= 25) return 'high'
    if (score >= 15) return 'moderate'
    return 'low'
  }

  const getScoreIcon = (score) => {
    const level = getScoreLevel(score)
    switch (level) {
      case 'high':
        return <TrendingUp className="h-5 w-5 text-green-600" />
      case 'moderate':
        return <Minus className="h-5 w-5 text-yellow-600" />
      case 'low':
        return <TrendingDown className="h-5 w-5 text-red-600" />
      default:
        return <Minus className="h-5 w-5 text-gray-600" />
    }
  }

  const getScoreColor = (score) => {
    const level = getScoreLevel(score)
    switch (level) {
      case 'high':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'moderate':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'low':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getPersonalizedContent = (archetype, score) => {
    const definition = archetypeDefinitions[archetype.toLowerCase()]
    if (!definition) return ''

    const level = getScoreLevel(score)
    switch (level) {
      case 'high':
        return definition.highScore
      case 'moderate':
        return definition.moderateScore
      case 'low':
        return definition.lowScore
      default:
        return definition.description
    }
  }

  return (
    <div className="space-y-8">
      {/* Executive Summary */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Executive Summary</h2>
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed mb-4">
            Based on your responses to the 35-question leadership assessment, your leadership profile reveals a unique combination of strengths and development opportunities. Your primary archetype is <strong>{results.primary.archetype}</strong> with a score of {results.primary.score} out of 35, indicating {getScoreLevel(results.primary.score)} proficiency in this leadership style.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Your secondary strength lies in the <strong>{results.secondary.archetype}</strong> archetype (score: {results.secondary.score}), which complements your primary style and provides additional leadership capabilities. The combination of these two archetypes suggests a well-rounded leadership approach with particular strengths in areas that require both {archetypeDefinitions[results.primary.archetype.toLowerCase()]?.traits[0]} and {archetypeDefinitions[results.secondary.archetype.toLowerCase()]?.traits[0]} skills.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Your development opportunity area is the <strong>{results.lowest.archetype}</strong> archetype (score: {results.lowest.score}), which represents an area where focused development could significantly enhance your overall leadership effectiveness and versatility.
          </p>
        </div>
      </div>

      {/* Detailed Archetype Analysis */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Detailed Archetype Analysis</h2>
        
        {results.sortedArchetypes.map((item, index) => {
          const definition = archetypeDefinitions[item.archetype.toLowerCase()]
          const isTop3 = index < 3
          
          return (
            <div key={item.archetype} className={`card ${isTop3 ? 'ring-2 ring-primary-100' : ''}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg border ${getScoreColor(item.score)} mr-4`}>
                    {getScoreIcon(item.score)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.archetype}</h3>
                    <p className="text-sm text-gray-600">Score: {item.score}/35 ({getScoreLevel(item.score)} level)</p>
                  </div>
                </div>
                {index === 0 && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Primary
                  </span>
                )}
                {index === 1 && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Secondary
                  </span>
                )}
              </div>

              {definition && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-700 text-sm">{definition.description}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Key Traits</h4>
                    <div className="flex flex-wrap gap-2">
                      {definition.traits.map((trait, traitIndex) => (
                        <span
                          key={traitIndex}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Personalized Insights</h4>
                    <p className="text-gray-700 text-sm">{getPersonalizedContent(item.archetype, item.score)}</p>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Development Recommendations */}
      <div className="card">
        <div className="flex items-center mb-4">
          <Target className="h-6 w-6 text-primary-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Development Recommendations</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Leverage Your Strengths</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm mb-3">
                Your primary archetype <strong>{results.primary.archetype}</strong> represents your natural leadership strength. Focus on:
              </p>
              <ul className="list-disc list-inside text-green-800 text-sm space-y-1">
                <li>Taking on projects that require {archetypeDefinitions[results.primary.archetype.toLowerCase()]?.traits[0]} skills</li>
                <li>Mentoring others in areas where you excel</li>
                <li>Seeking leadership roles that align with your natural {results.primary.archetype.toLowerCase()} abilities</li>
                <li>Building on your existing strengths to become an expert in this leadership style</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Develop Secondary Skills</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm mb-3">
                Your secondary archetype <strong>{results.secondary.archetype}</strong> provides complementary skills. Consider:
              </p>
              <ul className="list-disc list-inside text-blue-800 text-sm space-y-1">
                <li>Combining your primary and secondary strengths in complex leadership challenges</li>
                <li>Seeking feedback on how well you integrate both leadership styles</li>
                <li>Finding opportunities to practice {archetypeDefinitions[results.secondary.archetype.toLowerCase()]?.traits[0]} skills</li>
                <li>Learning from leaders who excel in your secondary archetype</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Address Development Areas</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm mb-3">
                Your lowest scoring archetype <strong>{results.lowest.archetype}</strong> represents a development opportunity:
              </p>
              <ul className="list-disc list-inside text-yellow-800 text-sm space-y-1">
                <li>Seek training or coaching in {archetypeDefinitions[results.lowest.archetype.toLowerCase()]?.traits[0]} skills</li>
                <li>Partner with team members who are strong in this archetype</li>
                <li>Practice {results.lowest.archetype.toLowerCase()} behaviors in low-risk situations</li>
                <li>Set specific development goals for improving in this area</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Action Planning */}
      <div className="card">
        <div className="flex items-center mb-4">
          <Lightbulb className="h-6 w-6 text-primary-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">90-Day Action Plan</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Days 1-30: Assessment & Planning</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Share results with your manager or mentor</li>
              <li>• Identify specific situations to apply your primary archetype</li>
              <li>• Set measurable development goals</li>
              <li>• Find an accountability partner</li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Days 31-60: Active Development</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Practice new behaviors in team meetings</li>
              <li>• Seek feedback on your leadership approach</li>
              <li>• Take on a project requiring your development area</li>
              <li>• Schedule regular check-ins with your mentor</li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Days 61-90: Integration & Reflection</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Evaluate progress against your goals</li>
              <li>• Gather 360-degree feedback</li>
              <li>• Plan for continued development</li>
              <li>• Consider retaking the assessment</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="card">
        <div className="flex items-center mb-4">
          <BookOpen className="h-6 w-6 text-primary-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-900">Recommended Resources</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Books & Articles</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• "The Leadership Challenge" by Kouzes & Posner</li>
              <li>• "Strengths Based Leadership" by Tom Rath</li>
              <li>• Harvard Business Review Leadership articles</li>
              <li>• "Multipliers" by Liz Wiseman</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Development Activities</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• Join a leadership development program</li>
              <li>• Find a mentor in your development area</li>
              <li>• Attend leadership workshops or conferences</li>
              <li>• Practice with leadership simulation exercises</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultsAnalysis
