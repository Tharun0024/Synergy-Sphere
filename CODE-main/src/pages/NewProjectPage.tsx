import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X } from 'lucide-react';
import Layout from '../components/Layout';
import Header from '../components/Header';
import { useApp } from '../context/AppContext';

const NewProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const { addProject } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    memberEmails: ['']
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleMemberEmailChange = (index: number, value: string) => {
    const newEmails = [...formData.memberEmails];
    newEmails[index] = value;
    setFormData({
      ...formData,
      memberEmails: newEmails
    });
  };

  const addMemberField = () => {
    setFormData({
      ...formData,
      memberEmails: [...formData.memberEmails, '']
    });
  };

  const removeMemberField = (index: number) => {
    if (formData.memberEmails.length > 1) {
      const newEmails = formData.memberEmails.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        memberEmails: newEmails
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create members array from emails
    const members = formData.memberEmails
      .filter(email => email.trim() !== '')
      .map((email, index) => ({
        id: (index + 1).toString(),
        name: email.split('@')[0], // Use email prefix as name for demo
        email: email.trim()
      }));

    // Add the project
    addProject({
      title: formData.title,
      description: formData.description,
      members
    });

    // Navigate back to dashboard
    navigate('/dashboard');
  };

  return (
    <Layout>
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors duration-200"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Dashboard
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Project</h1>
          <p className="text-gray-600">Set up a new project and invite your team members</p>
        </div>

        {/* Project Form */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Name */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Project Name *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter project name"
                required
              />
            </div>

            {/* Project Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Project Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Describe your project goals and objectives"
                required
              />
            </div>

            {/* Team Members */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Team Members
              </label>
              <p className="text-sm text-gray-500 mb-4">Add team member email addresses</p>
              
              <div className="space-y-3">
                {formData.memberEmails.map((email, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => handleMemberEmailChange(index, e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="team.member@company.com"
                    />
                    {formData.memberEmails.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMemberField(index)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addMemberField}
                className="mt-3 inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                <Plus size={16} className="mr-2" />
                Add Another Member
              </button>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="flex-1 sm:flex-none inline-flex items-center justify-center px-8 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Create Project
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="flex-1 sm:flex-none inline-flex items-center justify-center px-8 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </Layout>
  );
};

export default NewProjectPage;