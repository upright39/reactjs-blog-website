import HomePage from "./components/frontend/HomePage";
import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000/"

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token')
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  return config

})



function App() {
  return (
    <div>
      <HomePage />
    </div>
  );
}

export default App;
