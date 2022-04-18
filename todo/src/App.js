import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/store";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import Calendar from "./components/Calendar/Calendar";



function App() {
  return (
      <Provider store={store}>
          <BrowserRouter>
            <div className="App">
                <Sidebar/>
                <Main/>
                <Calendar/>
            </div>
          </BrowserRouter>
      </Provider>
  );
}

export default App;
