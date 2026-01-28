import React from 'react';
import AppRoutes from './AppRouting';
import Modal from 'react-modal';
import { Toaster } from 'react-hot-toast';

Modal.setAppElement('#root');

function App() {
  return (
    <div className="modal-open">
      <Toaster position="top-right" />
      <AppRoutes />
    </div>
  );
}

export default App;
