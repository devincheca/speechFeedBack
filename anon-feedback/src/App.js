import logo from './logo.svg';
import './App.css';

async function req(params) {
  return await fetch('/api/' + params.endpoint, {
    method: 'POST',
    body: JSON.stringify(params.data),
  });
}

async function tryNetlifyFunc() {
  const res = await req({
    endpoint: 'createLink',
    data: {
      stuff: 'blank',
    },
  });
  console.log('log res here: ', res);
}

function App() {
  return (
    <div className="App">
      <button onclick={() => { tryNetlifyFunc(); }}>Click Me</button>
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
