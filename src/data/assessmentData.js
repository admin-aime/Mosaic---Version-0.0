export const archetypeDefinitions = {
  visionary: {
    name: 'Visionary',
    description: 'Strategic thinkers who inspire others with their vision of the future',
    traits: ['Strategic thinking', 'Innovation', 'Inspiration', 'Future-focused', 'Change catalyst'],
    highScore: 'You excel at seeing the big picture and inspiring others with your vision. You naturally think strategically and are comfortable with ambiguity and change.',
    moderateScore: 'You have good strategic thinking abilities and can inspire others when needed. You balance vision with practical considerations.',
    lowScore: 'You prefer to focus on immediate, concrete tasks rather than long-term vision. You may benefit from developing strategic thinking skills.'
  },
  coach: {
    name: 'Coach',
    description: 'Developers of people who focus on growth and potential',
    traits: ['People development', 'Mentoring', 'Empathy', 'Growth mindset', 'Supportive'],
    highScore: 'You excel at developing others and helping them reach their potential. You naturally see the best in people and enjoy mentoring.',
    moderateScore: 'You have good people development skills and can coach others when needed. You balance support with performance expectations.',
    lowScore: 'You may focus more on tasks than people development. Consider investing more time in coaching and mentoring others.'
  },
  connector: {
    name: 'Connector',
    description: 'Relationship builders who excel at networking and collaboration',
    traits: ['Networking', 'Relationship building', 'Collaboration', 'Communication', 'Influence'],
    highScore: 'You excel at building relationships and connecting people. You naturally collaborate and have strong networking abilities.',
    moderateScore: 'You have good relationship building skills and can connect with others effectively. You balance collaboration with individual work.',
    lowScore: 'You may prefer working independently rather than building extensive networks. Consider developing your relationship building skills.'
  },
  challenger: {
    name: 'Challenger',
    description: 'Change agents who question the status quo and drive improvement',
    traits: ['Critical thinking', 'Change advocacy', 'Courage', 'Innovation', 'Results-focused'],
    highScore: 'You excel at challenging the status quo and driving change. You ask tough questions and push for continuous improvement.',
    moderateScore: 'You can challenge when necessary and drive change when needed. You balance innovation with stability.',
    lowScore: 'You may prefer maintaining stability rather than challenging existing processes. Consider developing your change advocacy skills.'
  },
  guardian: {
    name: 'Guardian',
    description: 'Protectors who ensure stability, quality, and risk management',
    traits: ['Risk management', 'Quality focus', 'Stability', 'Process orientation', 'Reliability'],
    highScore: 'You excel at managing risk and ensuring quality. You provide stability and can be relied upon to maintain standards.',
    moderateScore: 'You have good risk management skills and can ensure quality when needed. You balance stability with innovation.',
    lowScore: 'You may focus more on innovation than risk management. Consider developing your quality assurance and stability skills.'
  },
  energizer: {
    name: 'Energizer',
    description: 'Motivators who bring enthusiasm and drive team engagement',
    traits: ['Enthusiasm', 'Motivation', 'Team building', 'Positive energy', 'Engagement'],
    highScore: 'You excel at energizing others and creating positive team dynamics. You naturally motivate and engage people.',
    moderateScore: 'You have good motivational skills and can energize others when needed. You balance enthusiasm with realism.',
    lowScore: 'You may be more reserved in your approach to motivation. Consider developing your team energizing skills.'
  },
  pilot: {
    name: 'Pilot',
    description: 'Executors who navigate through complexity and deliver results',
    traits: ['Execution', 'Navigation', 'Results delivery', 'Problem solving', 'Adaptability'],
    highScore: 'You excel at executing plans and navigating through complex situations. You consistently deliver results and solve problems.',
    moderateScore: 'You have good execution skills and can navigate complexity when needed. You balance planning with action.',
    lowScore: 'You may prefer planning over execution. Consider developing your implementation and problem-solving skills.'
  }
}

export const assessmentQuestions = [
  // Visionary questions
  { id: 'v1', archetype: 'visionary', text: 'I naturally think about long-term strategic implications of decisions' },
  { id: 'v2', archetype: 'visionary', text: 'I enjoy creating and sharing compelling visions of the future' },
  { id: 'v3', archetype: 'visionary', text: 'I see patterns and connections that others might miss' },
  { id: 'v4', archetype: 'visionary', text: 'I am comfortable with ambiguity and uncertainty' },
  { id: 'v5', archetype: 'visionary', text: 'I inspire others to think beyond current limitations' },

  // Coach questions
  { id: 'c1', archetype: 'coach', text: 'I actively seek opportunities to develop others' },
  { id: 'c2', archetype: 'coach', text: 'I provide constructive feedback to help people grow' },
  { id: 'c3', archetype: 'coach', text: 'I see potential in people that they may not see in themselves' },
  { id: 'c4', archetype: 'coach', text: 'I invest time in mentoring and coaching conversations' },
  { id: 'c5', archetype: 'coach', text: 'I celebrate others\' achievements and progress' },

  // Connector questions
  { id: 'con1', archetype: 'connector', text: 'I easily build rapport with new people' },
  { id: 'con2', archetype: 'connector', text: 'I actively maintain a broad network of relationships' },
  { id: 'con3', archetype: 'connector', text: 'I bring people together to collaborate on projects' },
  { id: 'con4', archetype: 'connector', text: 'I am skilled at influencing others through relationships' },
  { id: 'con5', archetype: 'connector', text: 'I enjoy facilitating connections between others' },

  // Challenger questions
  { id: 'ch1', archetype: 'challenger', text: 'I question existing processes and ways of doing things' },
  { id: 'ch2', archetype: 'challenger', text: 'I am willing to have difficult conversations when necessary' },
  { id: 'ch3', archetype: 'challenger', text: 'I push for higher standards and continuous improvement' },
  { id: 'ch4', archetype: 'challenger', text: 'I advocate for change even when it\'s unpopular' },
  { id: 'ch5', archetype: 'challenger', text: 'I challenge assumptions and conventional thinking' },

  // Guardian questions
  { id: 'g1', archetype: 'guardian', text: 'I carefully assess risks before making decisions' },
  { id: 'g2', archetype: 'guardian', text: 'I ensure quality standards are maintained' },
  { id: 'g3', archetype: 'guardian', text: 'I provide stability during times of change' },
  { id: 'g4', archetype: 'guardian', text: 'I follow established processes and procedures' },
  { id: 'g5', archetype: 'guardian', text: 'I protect the team from unnecessary risks' },

  // Energizer questions
  { id: 'e1', archetype: 'energizer', text: 'I bring enthusiasm and positive energy to teams' },
  { id: 'e2', archetype: 'energizer', text: 'I motivate others during challenging times' },
  { id: 'e3', archetype: 'energizer', text: 'I create engaging and fun work environments' },
  { id: 'e4', archetype: 'energizer', text: 'I help build team spirit and camaraderie' },
  { id: 'e5', archetype: 'energizer', text: 'I encourage others to stay positive and focused' },

  // Pilot questions
  { id: 'p1', archetype: 'pilot', text: 'I excel at turning plans into concrete results' },
  { id: 'p2', archetype: 'pilot', text: 'I navigate through complex problems effectively' },
  { id: 'p3', archetype: 'pilot', text: 'I adapt quickly when circumstances change' },
  { id: 'p4', archetype: 'pilot', text: 'I take ownership of delivering outcomes' },
  { id: 'p5', archetype: 'pilot', text: 'I find practical solutions to challenging situations' }
]

export const teamMembers = {
  ian: {
    id: 'ian',
    name: 'Ian Buckingham',
    role: 'Senior Leadership Consultant',
    profileSummary: 'Strategic visionary with strong coaching abilities',
    archetypeScores: {
      visionary: 28,
      coach: 25,
      connector: 18,
      challenger: 22,
      guardian: 15,
      energizer: 20,
      pilot: 24
    }
  },
  kate: {
    id: 'kate',
    name: 'Kate Hargreaves',
    role: 'Team Development Specialist',
    profileSummary: 'People-focused leader with strong connecting abilities',
    archetypeScores: {
      visionary: 20,
      coach: 30,
      connector: 26,
      challenger: 16,
      guardian: 18,
      energizer: 28,
      pilot: 19
    }
  },
  bobbi: {
    id: 'bobbi',
    name: 'Bobbi Temple',
    role: 'Change Management Expert',
    profileSummary: 'Results-driven leader with strong execution focus',
    archetypeScores: {
      visionary: 22,
      coach: 19,
      connector: 21,
      challenger: 27,
      guardian: 23,
      energizer: 17,
      pilot: 29
    }
  }
}
