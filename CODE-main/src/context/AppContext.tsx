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

const dummyProjects: Project[] = [
  {
    id: '3',
    title: 'Codex',
    description: 'Collaboration workspace for project Codex',
    createdDate: '2025-09-06',
    members: [
      { id: '1', name: 'Thirumalai', email: 'thirumalai@codex.com' },
      { id: '2', name: 'Surya Kumar', email: 'surya@codex.com' },
      { id: '3', name: 'Thiruppugazh', email: 'thiruppugazh@codex.com' },
      { id: '4', name: 'Tharuneshvar', email: 'tharuneshvar@codex.com' },
    ],
    tasks: [],
  },
];

const dummyTasks: Task[] = [];

const dummyMessages: ChatMessage[] = [
  {
    id: '1',
    sender: 'Thirumalai',
    message: 'Welcome to Codex group chat!',
    timestamp: '2025-09-06T14:00:00',
    projectId: '3',
  },
  {
    id: '2',
    sender: 'Surya Kumar',
    message: 'Let’s plan the next milestones.',
    timestamp: '2025-09-06T14:30:00',
    projectId: '3',
  },
  {
    id: '3',
    sender: 'Thiruppugazh',
    message: 'Shared docs are ready for review.',
    timestamp: '2025-09-06T14:45:00',
    projectId: '3',
  },
  {
    id: '4',
    sender: 'Tharuneshvar',
    message: 'Great! I will start testing today.',
    timestamp: '2025-09-06T15:00:00',
    projectId: '3',
  },
  {
    id: '5',
    sender: 'Thirumalai',
    message: 'Hi Tharuneshvar, can you check the UI changes?'
,
    timestamp: '2025-09-06T14:15:00',
    projectId: '3',
    privateChatWith: 'Tharuneshvar',
  },
  {
    id: '6',
    sender: 'Tharuneshvar',
    message: 'Sure, will review and get back.',
    timestamp: '2025-09-06T14:20:00',
    projectId: '3',
    privateChatWith: 'Thirumalai',
  },
  {
    id: '7',
    sender: 'Surya Kumar',
    message: 'Tharuneshvar, update on backend fixes?',
    timestamp: '2025-09-06T14:25:00',
    projectId: '3',
    privateChatWith: 'Tharuneshvar',
  },
  {
    id: '8',
    sender: 'Tharuneshvar',
    message: 'Almost done, latest build will be ready soon.',
    timestamp: '2025-09-06T14:40:00',
    projectId: '3',
    privateChatWith: 'Surya Kumar',
  },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: '4',
    name: 'Tharuneshvar',
    email: 'tharuneshvar@codex.com',
  });
  const [projects, setProjects] = useState<Project[]>(dummyProjects);
  const [tasks, setTasks] = useState<Task[]>(dummyTasks);
  const [messages, setMessages] = useState<ChatMessage[]>(dummyMessages);

  const addProject = (projectData: Omit<Project, 'id' | 'createdDate' | 'tasks'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdDate: new Date().toISOString().split('T')[0],
      tasks: [],
    };
    setProjects((prev) => [...prev, newProject]);
  };

  const addTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const addMessage = (messageData: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...messageData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const getProjectById = (id: string) => projects.find((p) => p.id === id);

  const getTasksByProjectId = (projectId: string) => tasks.filter((t) => t.projectId === projectId);

  const getMessagesByProjectId = (projectId: string) => messages.filter((m) => m.projectId === projectId);

  return (
    <AppContext.Provider
      value={{
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
        getMessagesByProjectId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
