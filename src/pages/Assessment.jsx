import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAssessment } from '../contexts/AssessmentContext'
import { ChevronLeft, ChevronRight, Save, Send, AlertCircle } from 'lucide-react'

function Assessment() {
  const navigate = useNavigate()
  const { 
    currentAssessment, 
    startAssessment, 
    saveProgress, 
    submitAssessment, 
    questions 
  } = useAssessment()
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState({})
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false)

  useEffect(() => {
    if (!currentAssessment) {
      const assessment = startAssessment()
      setResponses(assessment.responses || {})
    } else {
      setResponses(currentAssessment.responses || {})
    }
  }, [currentAssessment, startAssessment])

  const currentQuestion = questions[currentQuestionIndex]
  const progress = Math.round((Object.keys(responses).length / questions.length) * 100)
  const isLastQuestion = currentQuestionIndex === questions.length - 1
  const allQuestionsAnswered = Object.keys(responses).length === questions.length

  const handleAnswer = (answer) => {
    const newResponses = { ...responses, [currentQuestion.id]: answer }
    setResponses(newResponses)
    saveProgress(currentQuestion.id, answer)
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSave = () => {
    setShowSaveConfirmation(true)
    setTimeout(() => setShowSaveConfirmation(false), 2000)
  }

  const handleSubmit = () => {
    if (!allQuestionsAnswered) {
      alert('Please answer all questions before submitting.')
      return
    }

    const completedAssessment = submitAssessment()
    if (completedAssessment) {
      navigate(`/results/${completedAssessment.id}`)
    }
  }

  const answerOptions = [
    { value: 'hardly_ever', label: 'Hardly Ever', score: 0 },
    { value: 'sometimes', label: 'Sometimes', score: 3 },
    { value: 'often', label: 'Often', score: 7 }
  ]

  if (!currentQuestion) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading assessment...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Leadership Assessment</h1>
          <p className="mt-1 text-sm text-gray-600">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{progress}% complete</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="card mb-8">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-primary-600 font-medium text-sm">
                  {currentQuestionIndex + 1}
                </span>
              </div>
              <span className="text-sm font-medium text-primary-600 uppercase tracking-wide">
                {currentQuestion.archetype}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 leading-relaxed">
              {currentQuestion.text}
            </h2>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {answerOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  responses[currentQuestion.id] === option.value
                    ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={option.value}
                  checked={responses[currentQuestion.id] === option.value}
                  onChange={() => handleAnswer(option.value)}
                  className="sr-only"
                />
                <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                  responses[currentQuestion.id] === option.value
                    ? 'border-primary-500 bg-primary-500'
                    : 'border-gray-300'
                }`}>
                  {responses[currentQuestion.id] === option.value && (
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  )}
                </div>
                <div className="flex-1">
                  <span className="text-gray-900 font-medium">{option.label}</span>
                  <span className="text-gray-500 text-sm ml-2">({option.score} points)</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Previous
          </button>

          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Progress
            </button>

            {isLastQuestion && allQuestionsAnswered ? (
              <button
                onClick={handleSubmit}
                className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Assessment
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={!responses[currentQuestion.id] || isLastQuestion}
                className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight className="h-5 w-5 ml-1" />
              </button>
            )}
          </div>
        </div>

        {/* Completion Status */}
        {!allQuestionsAnswered && (
          <div className="card bg-yellow-50 border-yellow-200">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-3" />
              <div>
                <p className="text-yellow-800 font-medium">
                  {questions.length - Object.keys(responses).length} questions remaining
                </p>
                <p className="text-yellow-700 text-sm">
                  Complete all questions to submit your assessment and view results.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Save Confirmation */}
        {showSaveConfirmation && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
            Progress saved successfully!
          </div>
        )}
      </div>
    </div>
  )
}

export default Assessment
