import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertTriangle, Send, Download, RefreshCw, Users } from 'lucide-react';

const initialTeamData = [
  {
    id: 1,
    name: 'Ian Buckingham',
    email: 'ian.buckingham@company.com',
    status: 'completed',
    completionDate: '2024-01-15',
    dueDate: '2024-01-20',
    assessmentType: 'Annual Performance Review'
  },
  {
    id: 2,
    name: 'Kate Hargreaves',
    email: 'kate.hargreaves@company.com',
    status: 'pending',
    completionDate: null,
    dueDate: '2024-01-25',
    assessmentType: 'Annual Performance Review'
  },
  {
    id: 3,
    name: 'Bobbi Temple',
    email: 'bobbi.temple@company.com',
    status: 'overdue',
    completionDate: null,
    dueDate: '2024-01-10',
    assessmentType: 'Annual Performance Review'
  }
];

function App() {
  const [teamMembers, setTeamMembers] = useState(initialTeamData);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('assessmentTrackerData');
    if (savedData) {
      setTeamMembers(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage whenever teamMembers changes
  useEffect(() => {
    localStorage.setItem('assessmentTrackerData', JSON.stringify(teamMembers));
  }, [teamMembers]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={20} />;
      case 'pending':
        return <Clock size={20} />;
      case 'overdue':
        return <AlertTriangle size={20} />;
      default:
        return <Clock size={20} />;
    }
  };

  const getStatusClass = (status) => {
    return `status-badge status-${status}`;
  };

  const calculateProgress = () => {
    const completed = teamMembers.filter(member => member.status === 'completed').length;
    return Math.round((completed / teamMembers.length) * 100);
  };

  const getCompletedCount = () => {
    return teamMembers.filter(member => member.status === 'completed').length;
  };

  const getPendingCount = () => {
    return teamMembers.filter(member => member.status === 'pending').length;
  };

  const getOverdueCount = () => {
    return teamMembers.filter(member => member.status === 'overdue').length;
  };

  const markAsCompleted = (memberId) => {
    setTeamMembers(prevMembers =>
      prevMembers.map(member =>
        member.id === memberId
          ? {
              ...member,
              status: 'completed',
              completionDate: new Date().toISOString().split('T')[0]
            }
          : member
      )
    );
  };

  const sendReminder = (memberName, email) => {
    alert(`Reminder sent to ${memberName} at ${email}`);
  };

  const exportReport = () => {
    const reportData = teamMembers.map(member => ({
      Name: member.name,
      Email: member.email,
      Status: member.status,
      'Due Date': member.dueDate,
      'Completion Date': member.completionDate || 'Not completed',
      'Assessment Type': member.assessmentType
    }));
    
    console.log('Export Report:', reportData);
    alert('Report exported to console (in a real app, this would download a file)');
  };

  const refreshData = () => {
    // In a real app, this would fetch fresh data from an API
    alert('Data refreshed successfully');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not completed';
    return new Date(dateString).toLocaleDateString();
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return 'Due today';
    return `${diffDays} days remaining`;
  };

  const progress = calculateProgress();

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Team Assessment Tracker</h1>
        <p className="dashboard-subtitle">Monitor team member assessment completion status</p>
      </div>

      <div className="progress-section">
        <div className="progress-header">
          <h2 className="progress-title">Overall Progress</h2>
          <div className="progress-stats">
            {getCompletedCount()} of {teamMembers.length} completed ({progress}%)
          </div>
        </div>
        
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="progress-labels">
          <span>Completed: {getCompletedCount()}</span>
          <span>Pending: {getPendingCount()}</span>
          <span>Overdue: {getOverdueCount()}</span>
        </div>
      </div>

      <div className="team-grid">
        {teamMembers.map(member => (
          <div key={member.id} className="member-card">
            <div className="member-header">
              <div className="member-info">
                <h3>{member.name}</h3>
                <p className="member-email">{member.email}</p>
              </div>
              <div className={getStatusClass(member.status)}>
                {getStatusIcon(member.status)}
                {member.status}
              </div>
            </div>

            <div className="member-details">
              <div className="detail-row">
                <span className="detail-label">Assessment Type:</span>
                <span className="detail-value">{member.assessmentType}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Due Date:</span>
                <span className="detail-value">{formatDate(member.dueDate)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Status:</span>
                <span className="detail-value">{getDaysUntilDue(member.dueDate)}</span>
              </div>
              {member.completionDate && (
                <div className="detail-row">
                  <span className="detail-label">Completed:</span>
                  <span className="detail-value">{formatDate(member.completionDate)}</span>
                </div>
              )}
            </div>

            <div className="member-actions">
              {member.status !== 'completed' && (
                <>
                  <button 
                    className="btn btn-primary"
                    onClick={() => sendReminder(member.name, member.email)}
                  >
                    <Send size={16} />
                    Send Reminder
                  </button>
                  <button 
                    className="btn btn-success"
                    onClick={() => markAsCompleted(member.id)}
                  >
                    <CheckCircle size={16} />
                    Mark Complete
                  </button>
                </>
              )}
              {member.status === 'completed' && (
                <button className="btn btn-secondary" disabled>
                  <CheckCircle size={16} />
                  Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="actions-section">
        <h2 className="actions-header">Management Actions</h2>
        <div className="actions-grid">
          <div className="action-btn" onClick={exportReport}>
            <div className="action-btn-icon">
              <Download size={24} />
            </div>
            <div className="action-btn-text">Export Report</div>
          </div>
          
          <div className="action-btn" onClick={refreshData}>
            <div className="action-btn-icon">
              <RefreshCw size={24} />
            </div>
            <div className="action-btn-text">Refresh Data</div>
          </div>
          
          <div className="action-btn" onClick={() => alert('Team management features coming soon!')}>
            <div className="action-btn-icon">
              <Users size={24} />
            </div>
            <div className="action-btn-text">Manage Team</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
