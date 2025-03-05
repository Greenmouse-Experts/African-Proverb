import React from 'react';
import Layout from '../../components/Layout/Layout';
import Dashboard from '@/pages/dashboard/Dashboard';


function App() {
  return (
    <div style={{ fontFamily: '"Montserrat", sans-serif', fontOpticalSizing: 'auto' }}>
      <Layout>
        <Dashboard />
      </Layout>
    </div>
  );
}

export default App;
