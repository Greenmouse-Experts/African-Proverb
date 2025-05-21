import React from 'react';
import Layout from '../../components/adminComponents/Layout/Layout';
import Dashboard from '@/pages/admin/Dashboard';


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
