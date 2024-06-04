import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import '../style.css'

const UserTable = () => {
    const [showModal, setShowModal] = useState(false);
    const { users, setUsers } = useContext(UserContext);

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:3000/users/${userId}`);
            setShowModal(true);

            // Обновите список пользователей после удаления
            const updatedUsers = users.filter((user) => user.id !== userId);
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };


    return (
        <div className="user-table">
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.length > 0 ? (
                    users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">Список пуст</td>
                    </tr>
                )}
                </tbody>
            </table>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Пользователь удален</h2>
                        <button className="close-button form-button" onClick={() => setShowModal(false)}>Закрыть</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserTable;