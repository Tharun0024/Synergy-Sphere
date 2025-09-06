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

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const addProject = (projectData: Omit<Project, 'id' | 'createdDate' | 'tasks'>) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdDate: new Date().toISOString().split('T')[0],
      tasks: []
    };
    setProjects((prev) => [...prev, newProject]);
  };

  const addTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString()
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const addMessage = (messageData: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...messageData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const getProjectById = (id: string) => {
    return projects.find((project) => project.id === id);
  };

  const getTasksByProjectId = (projectId: string) => {
    return tasks.filter((task) => task.projectId === projectId);
  };

  const getMessagesByProjectId = (projectId: string) => {
    return messages.filter((message) => message.projectId === projectId);
  };

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
        getMessagesByProjectId
      }}
    >
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
