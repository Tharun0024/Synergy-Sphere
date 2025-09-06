export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  createdDate: string;
  members: User[];
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  status: 'To-Do' | 'In Progress' | 'Done';
  projectId: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: string;
  projectId: string;
  privateChatWith?: string; // optional for private messages
}
