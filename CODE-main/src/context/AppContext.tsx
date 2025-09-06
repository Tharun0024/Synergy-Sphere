import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Project, Task, ChatMessage } from '../types';

interface AppContextType {
  user: User | null;
  projects: Project[];
  tasks: Task[];
  messages: ChatMessage[];
  setUser: (user: User | null) => void;
  addProject: (project: Omit<Project, 'id' | 'createdDate' | 'tasks'>) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  getProjectById: (id: string) => Project | undefined;
  getTasksByProjectId: (projectId: string) => Task[];
  getMessagesByProjectId: (projectId: string) => ChatMessage[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Dummy data
const dummyProjects: Project[] = [
  {
    id: '1',
    title: 'Website Redesign',
    description: 'Complete overhaul of company website with modern design and improved user experience',
    createdDate: '2024-01-15',
    members: [
      { id: '1', name: 'Alex Johnson', email: 'alex@company.com' },
      { id: '2', name: 'Sarah Chen', email: 'sarah@company.com' }
    ],
    tasks: []
  },
  {
    id: '2',
    title: 'Mobile App Development',
    description: 'Native iOS and Android app development for customer engagement platform',
    createdDate: '2024-01-10',
    members: [
      { id: '1', name: 'Alex Johnson', email: 'alex@company.com' },
      { id: '3', name: 'Mike Davis', email: 'mike@company.com' }
    ],
    tasks: []
  },
  {
    id: '3',
    title: 'Marketing Campaign Q1',
    description: 'Quarterly marketing strategy implementation across social media and digital channels',
    createdDate: '2024-01-05',
    members: [
      { id: '2', name: 'Sarah Chen', email: 'sarah@company.com' }
    ],
    tasks: []
  }
];

const dummyTasks: Task[] = [
  {
    id: '1',
    title: 'Design Homepage Mockup',
    description: 'Create initial design mockups for the new homepage layout',
    assignee: 'Alex Johnson',
    dueDate: '2025-10-15',
    status: 'In Progress',
    projectId: '1'
  },
  {
    id: '2',
    title: 'Set up Development Environment',
    description: 'Configure development tools and environment for the project',
    assignee: 'Sarah Chen',
    dueDate: '2024-02-10',
    status: 'In Progress',
    projectId: '1'
  }
];

const dummyMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'Alex Johnson',
    message: 'Hey team! Just uploaded the initial mockups. Please take a look and share your feedback.',
    timestamp: '2024-01-20T10:30:00Z',
    projectId: '1'
  },
  {
    id: '2',
    sender: 'Sarah Chen',
    message: 'Great work on the designs! I love the color scheme. Should we schedule a review meeting?',
    timestamp: '2024-01-20T11:15:00Z',
    projectId: '1'
  },
  {
    id: '3',
    sender: 'Alex Johnson',
    message: 'Absolutely! How about tomorrow at 2 PM?',
    timestamp: '2024-01-20T11:20:00Z',
    projectId: '1'
  }
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>(dummyProjects);
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);
  const [messages, setMessages] = useState<ChatMessage[]>(dummyMessages);

  const addProject = (projectData: Omit<Project, 'id' | 'createdDate' | 'tasks'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdDate: new Date().toISOString().split('T')[0],
      tasks: []
    };
    setProjects(prev => [...prev, newProject]);
  };

  const addTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const addMessage = (messageData: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...messageData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const getProjectById = (id: string) => {
    return projects.find(project => project.id === id);
  };

  const getTasksByProjectId = (projectId: string) => {
    return tasks.filter(task => task.projectId === projectId);
  };

  const getMessagesByProjectId = (projectId: string) => {
    return messages.filter(message => message.projectId === projectId);
  };

  return (
    <AppContext.Provider value={{
      user,
      projects,
      tasks,
      messages,
      setUser,
      addProject,
      addTask,
      addMessage,
      getProjectById,
      getTasksByProjectId,
      getMessagesByProjectId
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};