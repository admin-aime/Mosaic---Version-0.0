import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import { assessmentQuestions, archetypeDefinitions, teamMembers } from '../data/assessmentData'

const AssessmentContext = createContext()

export function useAssessment() {
  const context = useContext(AssessmentContext)
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider')
  }
  return context
}

export function AssessmentProvider({ children }) {
  const { user } = useAuth()
  const [currentAssessment, setCurrentAssessment] = useState(null)
  const [assessmentHistory, setAssessmentHistory] = useState([])

  useEffect(() => {
    if (user) {
      const savedAssessments = localStorage.getItem(`mosaic_assessments_${user.id}`)
      if (savedAssessments) {
        setAssessmentHistory(JSON.parse(savedAssessments))
      }
    }
  }, [user])

  const startAssessment = () => {
    const newAssessment = {
      id: Date.now().toString(),
      userId: user.id,
      responses: {},
      progress: 0,
      startedAt: new Date().toISOString(),
      completedAt: null,
      results: null
    }
    setCurrentAssessment(newAssessment)
    return newAssessment
  }

  const saveProgress = (questionId, answer) => {
    if (!currentAssessment) return

    const updatedAssessment = {
      ...currentAssessment,
      responses: {
        ...currentAssessment.responses,
        [questionId]: answer
      },
      progress: Math.round((Object.keys({...currentAssessment.responses, [questionId]: answer}).length / assessmentQuestions.length) * 100)
    }

    setCurrentAssessment(updatedAssessment)
    
    // Save to localStorage
    const savedAssessments = JSON.parse(localStorage.getItem(`mosaic_assessments_${user.id}`) || '[]')
    const existingIndex = savedAssessments.findIndex(a => a.id === updatedAssessment.id)
    
    if (existingIndex >= 0) {
      savedAssessments[existingIndex] = updatedAssessment
    } else {
      savedAssessments.push(updatedAssessment)
    }
    
    localStorage.setItem(`mosaic_assessments_${user.id}`, JSON.stringify(savedAssessments))
    setAssessmentHistory(savedAssessments)
  }

  const calculateResults = (responses) => {
    const archetypeScores = {}
    
    // Initialize scores
    Object.keys(archetypeDefinitions).forEach(archetype => {
      archetypeScores[archetype] = 0
    })

    // Calculate scores
    assessmentQuestions.forEach(question => {
      const response = responses[question.id]
      if (response !== undefined) {
        const score = response === 'often' ? 7 : response === 'sometimes' ? 3 : 0
        archetypeScores[question.archetype] += score
      }
    })

    // Sort archetypes by score
    const sortedArchetypes = Object.entries(archetypeScores)
      .sort(([,a], [,b]) => b - a)
      .map(([archetype, score]) => ({ archetype, score }))

    return {
      archetypeScores,
      primary: sortedArchetypes[0],
      secondary: sortedArchetypes[1],
      lowest: sortedArchetypes[sortedArchetypes.length - 1],
      sortedArchetypes
    }
  }

  const submitAssessment = () => {
    if (!currentAssessment) return null

    const results = calculateResults(currentAssessment.responses)
    
    const completedAssessment = {
      ...currentAssessment,
      completedAt: new Date().toISOString(),
      results,
      progress: 100
    }

    // Save completed assessment
    const savedAssessments = JSON.parse(localStorage.getItem(`mosaic_assessments_${user.id}`) || '[]')
    const existingIndex = savedAssessments.findIndex(a => a.id === completedAssessment.id)
    
    if (existingIndex >= 0) {
      savedAssessments[existingIndex] = completedAssessment
    } else {
      savedAssessments.push(completedAssessment)
    }
    
    localStorage.setItem(`mosaic_assessments_${user.id}`, JSON.stringify(savedAssessments))
    setAssessmentHistory(savedAssessments)
    setCurrentAssessment(null)

    return completedAssessment
  }

  const loadAssessment = (assessmentId) => {
    const assessment = assessmentHistory.find(a => a.id === assessmentId)
    if (assessment && !assessment.completedAt) {
      setCurrentAssessment(assessment)
    }
    return assessment
  }

  const getAssessmentById = (assessmentId) => {
    return assessmentHistory.find(a => a.id === assessmentId)
  }

  const value = {
    currentAssessment,
    assessmentHistory,
    startAssessment,
    saveProgress,
    submitAssessment,
    loadAssessment,
    getAssessmentById,
    questions: assessmentQuestions,
    archetypeDefinitions,
    teamMembers
  }

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  )
}
