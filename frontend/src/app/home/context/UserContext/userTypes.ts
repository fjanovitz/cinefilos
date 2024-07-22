export interface UserContextProps {
    username: string,
    name: string,
    email: string
}
  
export type UserContextType = {
    user: UserContextProps | undefined,
    saveUser: (user: UserContextProps) => void;
}