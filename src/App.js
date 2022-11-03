import './App.css';
import UploadFile from './components/UploadFile';
import HttpClient from './api/HttpClient';

function App() {
  return (
    <div className="App">
      <HttpClient />
      <UploadFile />
    </div>
  );
}

export default App;
