import React from 'react';
import AppRoutes from './AppRouting';
import Modal from 'react-modal';


Modal.setAppElement('#root');

function App() {
  return (
        <div className="modal-open">
          <AppRoutes></AppRoutes>
        </div>
  );
}

export default App;
