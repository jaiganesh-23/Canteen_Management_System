import React from 'react';
import ProductEntryForm from '../components/ProductEntryForm';

const ProductFormPage = () => {
  return (
    <div className='register-staff-page'>
      <div className="register-staff-card">
        <ProductEntryForm />
        <div className="login-image">
            <img src="/hero_image2.png" alt="Product Management" />
        </div>
      </div>
    </div>
  );
};

export default ProductFormPage;
