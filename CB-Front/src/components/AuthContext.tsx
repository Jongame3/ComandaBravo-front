import { createContext, useContext, useState,useEffect } from "react";
import type { ReactNode } from "react";
import { Navigate, useNavigate } from "react-router-dom";

type User = {
    id: number,
    username: string,
    role: 1 | 20
}

type AuthContextType = {
    token : string | null;
    user: User  | null;
    isAuthenticated:boolean;
    loginf: (token: string, user :User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
    children: ReactNode;
}

export function AuthProvider({children} : AuthProviderProps) {
    const[token,setToken] = useState<string | null>(() => {return localStorage.getItem("token")});
    const navigate = useNavigate();
    const[user,setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem("user");

        if(!savedUser) {
            return null;
        }
        return JSON.parse(savedUser) as User;
    });

    const isAuthenticated = !!token

    useEffect(() => {
        const tokenTime = localStorage.getItem("tokenTime");
        if (tokenTime) {
        const timeElapsed = Date.now() - parseInt(tokenTime);

        if (timeElapsed > 3600000) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("tokenTime");
            setToken(null);
            setUser(null);
        }
        }
    }, []);

    useEffect(() => {
        if (token) {
        const tokenTime = Date.now().toString();
        localStorage.setItem("tokenTime", tokenTime);

      
        setTimeout(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("tokenTime");
            setToken(null);
            setUser(null);
            }, 3600000); 
        }
    } , [token]);

    function loginf(token :string, user: User){
        localStorage.setItem("token",token);
        localStorage.setItem("user", JSON.stringify(user));

        setToken(token);
        setUser(user);
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("tokenTime");
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value = {{token, user, isAuthenticated, loginf, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("Typescript выебуется")
    }

    return context;
}