import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';

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
    <div className="product-entry-form-container" style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="productName">Product Name</Label>
          <Input
            id="productName"
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="category">Category/Type</Label>
          <Select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Snack">Snack</option>
            <option value="Beverage">Beverage</option>
            <option value="Meal">Meal</option>
            <option value="Dessert">Dessert</option>
            <option value="Other">Other</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="productCode">Product Code/SKU</Label>
          <Input
            id="productCode"
            type="text"
            placeholder="Enter product code"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="mrp">MRP (₹)</Label>
          <Input
            id="mrp"
            type="number"
            placeholder="Enter MRP"
            value={mrp}
            onChange={(e) => setMrp(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="discount">Discount (%)</Label>
          <Input
            id="discount"
            type="number"
            placeholder="Enter discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>
        <div>
          <Label>Selling Price</Label>
          <p className="selling-price" style={{ fontSize: '1.2em', fontWeight: 'bold' }}>
            ₹{sellingPrice}
          </p>
        </div>
        <Button type="submit">Add Product</Button>
      </form>
    </div>
  );
};

export default ProductEntryForm;
