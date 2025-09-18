import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, ChevronLeft, Check, Target, BarChart3, Users, BookOpen } from 'lucide-react'

function Onboarding() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      title: 'Welcome to Mosaic',
      icon: Target,
      content: (
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-2xl">M</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Mosaic Leadership Platform</h2>
          <p className="text-gray-600 mb-6">
            Discover your unique leadership style and unlock your potential with our comprehensive assessment and analysis tools.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="p-4 bg-gray-50 rounded-lg">
              <Target className="h-8 w-8 text-primary-600 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Assess</h3>
              <p className="text-sm text-gray-600">Take our 35-question leadership assessment</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <BarChart3 className="h-8 w-8 text-primary-600 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Analyze</h3>
              <p className="text-sm text-gray-600">Get detailed insights and recommendations</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <Users className="h-8 w-8 text-primary-600 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Compare</h3>
              <p className="text-sm text-gray-600">Compare your profile with team members</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Leadership Archetypes',
      icon: Users,
      content: (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Understanding Leadership Archetypes</h2>
          <p className="text-gray-600 mb-6 text-center">
            Our assessment measures your alignment with seven distinct leadership archetypes:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Visionary</h3>
              <p className="text-sm text-gray-600">Strategic thinkers who inspire with future vision</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Coach</h3>
              <p className="text-sm text-gray-600">People developers focused on growth and potential</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Connector</h3>
              <p className="text-sm text-gray-600">Relationship builders who excel at collaboration</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Challenger</h3>
              <p className="text-sm text-gray-600">Change agents who question the status quo</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Guardian</h3>
              <p className="text-sm text-gray-600">Protectors who ensure stability and quality</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Energizer</h3>
              <p className="text-sm text-gray-600">Motivators who drive team engagement</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg md:col-span-2">
              <h3 className="font-semibold text-gray-900 mb-2">Pilot</h3>
              <p className="text-sm text-gray-600">Executors who navigate complexity and deliver results</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'How It Works',
      icon: BarChart3,
      content: (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">How the Assessment Works</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-sm font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Answer 35 Questions</h3>
                <p className="text-gray-600">
                  Each archetype has 5 questions. Rate how often you exhibit each behavior: Hardly Ever (0 points), Sometimes (3 points), or Often (7 points).
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-sm font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Get Your Scores</h3>
                <p className="text-gray-600">
                  Your responses are scored for each archetype (0-35 points). The highest score becomes your Primary archetype, second highest is Secondary.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center mr-4 mt-1">
                <span className="text-sm font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Receive Detailed Analysis</h3>
                <p className="text-gray-600">
                  Get a comprehensive 4000+ word report with personalized insights, development recommendations, and action plans.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Ready to Begin',
      icon: BookOpen,
      content: (
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">You're Ready to Get Started!</h2>
          <p className="text-gray-600 mb-6">
            You now understand how Mosaic works and what to expect from your leadership assessment. 
            The assessment takes about 10-15 minutes to complete.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-2">Tips for Best Results:</h3>
            <ul className="text-sm text-blue-800 text-left space-y-1">
              <li>• Answer honestly based on your typical behavior</li>
              <li>• Think about how you actually behave, not how you think you should</li>
              <li>• Consider your behavior across different situations</li>
              <li>• Take your time - you can save and resume if needed</li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/assessment')}
              className="btn-primary px-8 py-3"
            >
              Take Assessment Now
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-secondary px-8 py-3"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )
    }
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const skipOnboarding = () => {
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep + 1} of {steps.length}</span>
            <button
              onClick={skipOnboarding}
              className="text-primary-600 hover:text-primary-700"
            >
              Skip tour
            </button>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="card min-h-[500px] flex flex-col">
          <div className="flex-1">
            {steps[currentStep].content}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Previous
            </button>

            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentStep ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {currentStep === steps.length - 1 ? (
              <button
                onClick={() => navigate('/assessment')}
                className="btn-primary"
              >
                Get Started
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Next
                <ChevronRight className="h-5 w-5 ml-1" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Onboarding
