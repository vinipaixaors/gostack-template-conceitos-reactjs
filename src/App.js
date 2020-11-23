import React, {useState, useEffect} from "react";
import api from './services/api'


import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  },[]);

  // add
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repositorio ${Date.now()}`,
      url: `https://site.viniciuspaixao.com.br/${Date.now()}`,
      techs: 'ex01, ex02, ex03',
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  // Remove
  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ));

    // api.get('repositories').then(response => {
    //   setRepositories(response.data);
    // });
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repository => (
            <li key={repository.id}>{repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
