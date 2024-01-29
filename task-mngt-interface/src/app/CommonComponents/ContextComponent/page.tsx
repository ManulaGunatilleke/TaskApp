import { createContext } from 'react';

interface UserContextProps {
  user: any; // Update this to the actual type of your user object
  setUser: React.Dispatch<React.SetStateAction<any>>; // Update this to the actual type of your setUser function
}

const UserContext = createContext<UserContextProps>({ user: {}, setUser: () => {} });

export default UserContext;