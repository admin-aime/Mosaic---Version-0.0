import React from 'react'
import { Radar, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts'

function RadarChart({ data, comparisonData, comparisonName }) {
  const chartData = Object.entries(data).map(([archetype, score]) => ({
    archetype: archetype.charAt(0).toUpperCase() + archetype.slice(1),
    you: score,
    comparison: comparisonData ? comparisonData[archetype] : 0
  }))

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="archetype" tick={{ fontSize: 12 }} />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 35]} 
            tick={{ fontSize: 10 }}
            tickCount={6}
          />
          <Radar
            name="You"
            dataKey="you"
            stroke="#0ea5e9"
            fill="#0ea5e9"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          {comparisonData && (
            <Radar
              name={comparisonName || 'Comparison'}
              dataKey="comparison"
              stroke="#f59e0b"
              fill="#f59e0b"
              fillOpacity={0.2}
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          )}
          <Legend />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RadarChart
