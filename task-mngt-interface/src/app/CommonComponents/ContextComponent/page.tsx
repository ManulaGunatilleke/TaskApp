// UserContext.tsx
import { createContext } from 'react';

interface UserContextType {
  user: {
    id: number;
    emailId: string;
    name: string;
    password: string;
    role: string;
  };
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const UserContext = createContext<UserContextType>({
  user: {
    id: 0,
    emailId: '',
    name: '',
    password: '',
    role: '',
  },
  setUser: () => {},
});


export default UserContext;
