import logo from './logo.svg';
import './App.css';
// import Request from './helpers/request.js';

/*
async function tryNetlifyFunc() {
  const req = new Request();
  req.endpoint = 'feedback';
  req.data = {
    stuff: 'blank',
  };
  const res = await req.send();
}
*/

function App() {
  return (
    <div className="App">
      <button onClick={() => { console.log('just click') }}>Click Me</button>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
