import logo from './logo.png';
import './App.css';
import React, {useState, useEffect} from 'react';

function MyHeader() {
  return (
    <header>
      <img src={logo} id="logo" alt="Logo"></img>
      <h1>Pandore's Meow Show</h1>
    </header>
  );
}

function MyFooter() {
  return (
    <footer>
      <p>Felipe Menezes © Tem. Nem preciso dizer o que é.</p>
    </footer>
  );
}

function App() {
  const [catImage, setCatImage] = useState('');
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [catFact, setCatFact] = useState('');
  
  const fetchImage = (breedId = '') => {
    let url = 'https://api.thecatapi.com/v1/images/search';

    fetch(url)
    .then(response => response.json())
    .then(data => setCatImage(data[0].url))
    .catch(error => console.error("Erro ao buscar imagem: ", error));
  };

  const fetchBreeds = () => {
    fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => response.json())
    .then(data => setBreeds(data))
    .catch(error => console.error("Erro ao buscar raças: ", error));
  };

  const fetchCatFact = () => {
    fetch('https://meowfacts.herokuapp.com/')
    .then(response => response.json())
    .then(data => setCatFact(data.data[0]))
    .catch(error => console.error("Erro ao buscar fato: ", error));
  };

  function imageFactButton() {
    fetchImage();
    fetchCatFact();
  }

  useEffect(() => {
    fetchImage();
    fetchBreeds();
    fetchCatFact();
  }, []);

  return (
    <>
      <MyHeader/>
      <nav>

      </nav>
      <main>
        <div id="imageBox">
            {catImage && <img src={catImage} id="catBox" alt="Where the cat is"/>}
        </div>
        <button onClick={imageFactButton} id="newCatButton">+1 Gatenho :3</button>

        <div id="factBox">
          <h3>Fato sobre gatos</h3>
          <p>{catFact}</p>
        </div>
      </main>
      <MyFooter/>
    </>  
  );
}

export default App;
