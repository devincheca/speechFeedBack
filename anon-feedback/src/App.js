// import './App.css';
// import Request from './helpers/request.js';
import MainCard from './MainCard/MainCard.js';

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
    <div className="">
      <button className="btn btn-primary">test</button>
      <MainCard />
    </div>
  );
}

export default App;
