import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import '../style.css'

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const addUser = (newUser) => {
        setUsers([...users, newUser]);
    };

    return (
        <UserContext.Provider value={{ users, setUsers, addUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext ;