import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Send, MessageSquare } from 'lucide-react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import { useApp } from '../context/AppContext';

const ProjectWorkspacePage: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const { getProjectById, getMessagesByProjectId, addMessage, user } = useApp();
  
  const project = projectId ? getProjectById(projectId) : null;
  const messages = projectId ? getMessagesByProjectId(projectId) : [];
  
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !projectId || !user) return;

    addMessage({
      sender: user.name,
      message: newMessage.trim(),
      projectId
    });

    setNewMessage('');
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!project) {
    return (
      <Layout>
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h2>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-blue-500 hover:text-blue-600"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(`/project/${projectId}`)}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors duration-200"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to {project.title}
        </button>

        {/* Workspace Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <MessageSquare className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{project.title} Workspace</h1>
              <p className="text-gray-600">Team chat and collaboration</p>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-xl shadow-md flex flex-col h-96">
          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            {messages.length > 0 ? (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === user?.name ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                        message.sender === user?.name
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm font-medium ${
                          message.sender === user?.name ? 'text-blue-100' : 'text-gray-600'
                        }`}>
                          {message.sender}
                        </span>
                        <span className={`text-xs ${
                          message.sender === user?.name ? 'text-blue-200' : 'text-gray-500'
                        }`}>
                          {formatMessageTime(message.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm">{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No messages yet. Start the conversation!</p>
                </div>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-4">
            <form onSubmit={handleSendMessage} className="flex space-x-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>

        {/* Team Members */}
        <div className="bg-white rounded-xl shadow-md p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h3>
          <div className="flex flex-wrap gap-3">
            {project.members.map((member) => (
              <div
                key={member.id}
                className="flex items-center space-x-3 bg-gray-50 rounded-lg px-4 py-2"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ProjectWorkspacePage;