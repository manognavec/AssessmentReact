import React from 'react';
import './App.css';
import { BrowserRouter, Route} from 'react-router-dom';
import UserData from './Components/UserData';
import ProjectData from './Components/ProjectData';
import TaskData from './Components/TaskData';
import { Provider } from 'react-redux';
import { store, persistor } from './Store';
import { PersistGate } from 'redux-persist/integration/react';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <div className="App">
            <BrowserRouter>
              <Route exact path="/" component={UserData}/>
              <Route exact path="/project" component={ProjectData}/>
              <Route exact path="/task" component={TaskData}/>
            </BrowserRouter>
          </div>
        </PersistGate>
      </Provider>
    )
  }
}

export default App;
