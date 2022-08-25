import React, { useState } from 'react';
// icons
import { AiFillGithub } from 'react-icons/ai';
import { FaLinkedinIn } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';
import { DiReact } from 'react-icons/di';
import { FaTrashAlt } from 'react-icons/fa';
// styles
import './RenderList.css';
// comopnents

const RenderList = ({ listUsers, updateUsers }) => {
  // Removd user
  const handleRemovedItemUser = (checkdId) => {
    const newUserAfterRemoved = listUsers.filter(user => user.id != checkdId);
    updateUsers(newUserAfterRemoved);

    fetch(`http://localhost:3000/users/${checkdId}`, {
      method: 'DELETE'
    });
  }

  return (
    <div>
      <div className='users_container'>
        <div className='header_options'>
          <h2>Usuários cadastrados</h2>
          <ul className='icons_network'>
            <li>
              <a href="#"> <AiFillGithub /> </a>
            </li>
            <li>
              <a href="#"> <FaLinkedinIn /> </a>
            </li>
            <li>
              <a href="#"> <FiInstagram /> </a>
            </li>
            <li>
              <a href="#"> <DiReact /> </a>
            </li>
          </ul>
        </div>
        <div className='list_render_users'>
          <span className='user_options'>
            <h5>USUÁRIO</h5>
            <h5>OPÇÕES</h5>
          </span>
          {
            listUsers.map(user => (

              <div className='box_user'>
                <div>
                  <h3>{user.name} {user.secondName}</h3>
                  <p>{user.email}</p>
                </div>
                <span>
                  <button onClick={() => handleRemovedItemUser(user.id)} className='removedButton' title='Remover usuário'>
                    <FaTrashAlt />
                  </button>
                </span>
              </div>

            ))
          }
        </div>
      </div>
    </div>
  )
}

export default RenderList