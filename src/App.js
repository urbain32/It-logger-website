import React, { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';
import SearchBar from './component/layout/SearchBar';
import Logs from './component/logs/Logs';
import AddBtn from './component/layout/AddBtn';
import AddLogModal from './component/logs/AddLogModal';
import EditLogModal from './component/logs/EditLogModal';
import AddTechModal from './component/tech/AddTechModal';
import TechListModel from './component/tech/TechListModel';


const App = () => {
  useEffect(() => {
    //Init Materialize
    M.AutoInit();
  });
  return (
    <Provider store={store}>
      <Fragment>
        <SearchBar />

        <div className='container'>
          <AddBtn />
          <AddLogModal />
          <EditLogModal />
          <AddTechModal />
          <TechListModel />

          <Logs />
        </div>
      </Fragment>
    </Provider>
  );
};

export default App;
