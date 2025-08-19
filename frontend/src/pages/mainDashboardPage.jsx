import React from 'react';
import ProductEntryForm from '../components/ProductEntryForm';

const MainDashboardPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Canteen Management Dashboard</h1>
      <ProductEntryForm />
    </div>
  );
};

export default MainDashboardPage;

