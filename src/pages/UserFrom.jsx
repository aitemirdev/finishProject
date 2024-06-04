import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import '../style.css'

const UserForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { addUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/users', {
                name,
                email,
                username,
            });
            setShowModal(true);
            setName('');
            setEmail('');
            setUsername('');
            addUser(response.data); // Вызываем функцию addUser из контекста
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };



    return (
        <div className="user-form">
            <h2>Create User</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input className="form-input"
                           type="text"
                           placeholder="Name"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input className="form-input"
                           type="email"
                           placeholder="Email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="user name">User name</label>
                    <input className="form-input"
                           type="text"
                           placeholder="Username"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <button className="form-button" type="submit">Создать</button>
            </form>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Пользователь успешно создан</h2>
                        <button className="close-button form-button" onClick={() => setShowModal(false)}>Закрыть</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserForm;