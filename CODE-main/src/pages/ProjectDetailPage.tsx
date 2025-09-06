import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, MessageSquare, Calendar, User, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import { useApp } from '../context/AppContext';

const ProjectDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const { getProjectById, getTasksByProjectId } = useApp();

  const project = projectId ? getProjectById(projectId) : null;
  const tasks = projectId ? getTasksByProjectId(projectId) : [];

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Done':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'In Progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors duration-200"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Dashboard
        </button>

        {/* Project Header */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
              <p className="text-gray-600 text-lg">{project.description}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate(`/project/${projectId}/create-task`)}
                className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Plus size={20} className="mr-2" />
                Create Task
              </button>
              <button
                onClick={() => navigate(`/project/${projectId}/workspace`)}
                className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
              >
                <MessageSquare size={20} className="mr-2" />
                Project Workspace
              </button>
            </div>
          </div>

          {/* Project Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Created Date</h3>
              <div className="flex items-center text-gray-600">
                <Calendar size={16} className="mr-2" />
                {formatDate(project.createdDate)}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Team Members</h3>
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  {project.members.map((member) => (
                    <div
                      key={member.id}
                      className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full border-2 border-white flex items-center justify-center text-white text-sm font-semibold"
                      title={member.name}
                    >
                      {member.name.charAt(0)}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  {project.members.map(member => member.name).join(', ')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
            <span className="text-sm text-gray-500">{tasks.length} tasks</span>
          </div>

          {tasks.length > 0 ? (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        {getStatusIcon(task.status)}
                        <h3 className="text-lg font-semibold text-gray-900 ml-3">{task.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-3">{task.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500">
                    <div className="flex items-center mb-2 sm:mb-0">
                      <User size={16} className="mr-2" />
                      Assigned to: {task.assignee}
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2" />
                      Due: {formatDate(task.dueDate)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks yet</h3>
              <p className="text-gray-600 mb-6">Create your first task to get started</p>
              <button
                onClick={() => navigate(`/project/${projectId}/create-task`)}
                className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                <Plus size={20} className="mr-2" />
                Create Task
              </button>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default ProjectDetailPage;