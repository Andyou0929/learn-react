import './App.css';
import RouterView from "./components/RouterView"
import { BrowserRouter, Link } from 'react-router-dom';
import MyLayout from "./layout"
function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <BrowserRouter>
        <Link to="/">Home</Link>
        <span>|</span>
        <Link to="/todoList">TodoList</Link>
      
        <RouterView></RouterView>
      </BrowserRouter> */}
        <MyLayout />
      </BrowserRouter>
    </div>

  )
}
export default App;
