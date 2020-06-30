import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';

import Header from './components/Header';

export default function App() {
  const [ projects, setProjects ] = useState([]);
  const [ title, setTitle ] = useState('');
  const [ owner, setOwner ] = useState('');

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data)
    })
  }, []);

  async function handleAddProject() {
    // setProjects([... projects, `Novo Projeto ${Date.now()}`])

    const response = await api.post('/projects', {
      title,
      owner
    })
    const project = response.data

    setProjects([... projects, project ])
  }

  return (
    <>
      <Header title="Projects" />
      <ul>
        {projects.map(project => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>

      <input
        type="text"
        value={title}
        placeholder="Title"
        onChange={e => setTitle(e.target.value)}
      />

      <input
        type="text"
        value={owner}
        placeholder="Owner"
        onChange={e => setOwner(e.target.value)}
      />
      
      <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
    </>
  )
};