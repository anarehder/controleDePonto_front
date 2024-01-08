import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export default function UserProvider({ children}){
    const navigate = useNavigate();
    const lsUser = JSON.parse(localStorage.getItem("user"))
    const [user, setUser] = useState(lsUser === null ? {} : lsUser);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
            navigate("/summary");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    );
};