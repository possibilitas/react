import logo from '../features/assets/zerodose_logo.svg';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          ZeroDose_ASD Manager
        </p>
        <Link to="/login"
          className="App-link"
        >
          Learn a Digital Therapy Game
        </Link>
      </header>
    </div>
  );
}

export default App;
