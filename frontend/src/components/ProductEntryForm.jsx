import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const ProductEntryForm = () => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('Snack');
  const [productCode, setProductCode] = useState('');
  const [mrp, setMrp] = useState('');
  const [discount, setDiscount] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');

  useEffect(() => {
    if (mrp && discount) {
      const calculatedSellingPrice = mrp - (mrp * (discount / 100));
      setSellingPrice(calculatedSellingPrice.toFixed(2));
    } else if (mrp) {
      setSellingPrice(parseFloat(mrp).toFixed(2));
    }
    else {
      setSellingPrice('');
    }
  }, [mrp, discount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      productName,
      category,
      productCode,
      mrp,
      discount,
      sellingPrice,
    });
  };

  return (
    <div className="register-staff-form">
      <p className='register-staff-form-header'>Add New Product</p>
      <p className='register-staff-form-text'>Fill in the details to add a new product to the canteen.</p>
      <form onSubmit={handleSubmit}>
        <div className="register-staff-form-input">
          <Label htmlFor="productName">Product Name</Label>
          <Input
            id="productName"
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="register-staff-form-input">
          <Label htmlFor="category">Category/Type</Label>
          <Select onValueChange={(value) => setCategory(value)} defaultValue={category}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Snack">Snack</SelectItem>
              <SelectItem value="Beverage">Beverage</SelectItem>
              <SelectItem value="Meal">Meal</SelectItem>
              <SelectItem value="Dessert">Dessert</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="register-staff-form-input">
          <Label htmlFor="productCode">Product Code/SKU</Label>
          <Input
            id="productCode"
            type="text"
            placeholder="Enter product code"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
          />
        </div>
        <div className="register-staff-form-input">
          <Label htmlFor="mrp">MRP (₹)</Label>
          <Input
            id="mrp"
            type="number"
            placeholder="Enter MRP"
            value={mrp}
            onChange={(e) => setMrp(e.target.value)}
          />
        </div>
        <div className="register-staff-form-input">
          <Label htmlFor="discount">Discount (%)</Label>
          <Input
            id="discount"
            type="number"
            placeholder="Enter discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>
        <div className="register-staff-form-input">
          <Label>Selling Price</Label>
          <p>₹{sellingPrice}</p>
        </div>
        <div className='register-staff-button-div'>
          <Button type="submit" className='register-staff-form-button'>Add Product</Button>
        </div>
      </form>
    </div>
  );
};

export default ProductEntryForm;
