import React, { useState, useEffect } from 'react'; 
//uuid
import uuid from 'react-uuid'
// style 
import styles from './Aside.module.css'; 
//components
import RenderList from './RenderList';

const Aside = () => {
    //input values 
    const [name, setName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [email, setEmail] = useState('');

    // saved state Input
    const [users, setUsers] = useState([]); 

    // url > requestAPI/users/dbUsers
    const url = 'http://localhost:3000/users';

    useEffect(() => {
        async function GetDataApiUsers() {
            const response = await fetch(url); 
            const getResponse = await response.json(); 

            setUsers(getResponse); 
        }
        GetDataApiUsers(); 
    }, []); 

    // create user object with uuid
    
    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const newUser = {
            id: uuid(),
            name, 
            secondName,
            email
        }

        const response = await fetch(url, {
            method:'POST', 
            body: JSON.stringify(newUser), 
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })

        setName('');
        setSecondName('');  
        setEmail(''); 
        
        const addMore = await response.json(); 
        setUsers((dataCopleted) => [...dataCopleted, addMore]); 

    }


    return (
        <aside className={styles['aside_container']}>
            <div>
                <h2>FORMULÁRIO</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Nome</span>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Digite o seu nome'
                        />
                    </label>
                    <label>
                        <span>Sobrenome</span>
                        <input
                            type="text"
                            value={secondName}
                            onChange={(e) => setSecondName(e.target.value)}
                            placeholder='Digite o seu sobrenome'
                        />
                    </label>
                    <label>
                        <span>E-mail</span>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Digite o seu e-mail'
                        />
                    </label>
                    <input type="submit" value="Cadastrar usuário" />
                </form>
            </div>
            <RenderList 
                listUsers={users} 
                updateUsers={setUsers} 
                name={name} 
                email={email}
                secondName={secondName}
                url={url}
                setName={setName}
                setSecondName={setSecondName}  
                setEmail={setEmail}
            />
        </aside>
    )
}

export default Aside