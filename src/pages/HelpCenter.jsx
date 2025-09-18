import React, { useState } from 'react'
import { Search, Book, MessageCircle, Mail, Phone, ChevronDown, ChevronRight } from 'lucide-react'

function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState(null)

  const categories = [
    {
      name: 'Getting Started',
      icon: Book,
      articles: [
        'How to create your account',
        'Taking your first assessment',
        'Understanding your results',
        'Setting up your profile'
      ]
    },
    {
      name: 'Assessments',
      icon: MessageCircle,
      articles: [
        'How the leadership assessment works',
        'Saving and resuming assessments',
        'Understanding archetype scoring',
        'Retaking assessments'
      ]
    },
    {
      name: 'Results & Analysis',
      icon: Book,
      articles: [
        'Reading your leadership profile',
        'Comparing with team members',
        'Exporting your results',
        'Development recommendations'
      ]
    }
  ]

  const faqs = [
    {
      question: 'How accurate is the leadership assessment?',
      answer: 'The Mosaic Leadership Assessment is based on validated psychological research and has been tested with thousands of leaders. While no assessment is 100% accurate, our tool provides reliable insights into your leadership preferences and tendencies.'
    },
    {
      question: 'Can I retake the assessment?',
      answer: 'Yes, you can retake the assessment at any time. We recommend waiting at least 3-6 months between assessments to allow for meaningful development and change in your leadership approach.'
    },
    {
      question: 'How do I compare my results with team members?',
      answer: 'In the Results section, navigate to the Team Comparison tab. You can select from predefined team members (Ian Buckingham, Kate Hargreaves, and Bobbi Temple) to overlay their profiles on your radar chart.'
    },
    {
      question: 'What if I disagree with my results?',
      answer: 'Assessment results reflect your responses at a specific point in time. If you disagree, consider discussing the results with a mentor or coach, or retake the assessment after some reflection on your leadership behaviors.'
    },
    {
      question: 'How can I use these results for development?',
      answer: 'Your results include detailed development recommendations, a 90-day action plan, and suggested resources. Focus on leveraging your strengths while developing areas of opportunity.'
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Yes, we take data security seriously. All assessment data is encrypted and stored securely. Your individual results are private and only accessible to you unless you choose to share them.'
    }
  ]

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-lg text-gray-600 mb-8">
            Find answers to your questions and get the most out of Mosaic
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10 w-full"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <div key={category.name} className="card hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                    <Icon className="h-5 w-5 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                </div>
                <ul className="space-y-2">
                  {category.articles.map((article, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                      >
                        {article}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="card">
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                  {expandedFaq === index ? (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="card bg-primary-50 border-primary-200">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Still need help?</h2>
            <p className="text-gray-600 mb-6">
              Our support team is here to help you get the most out of Mosaic
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                <MessageCircle className="h-5 w-5 mr-2" />
                Start Live Chat
              </button>
              <button className="flex items-center justify-center px-6 py-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50">
                <Mail className="h-5 w-5 mr-2" />
                Send Email
              </button>
              <button className="flex items-center justify-center px-6 py-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50">
                <Phone className="h-5 w-5 mr-2" />
                Schedule Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpCenter
