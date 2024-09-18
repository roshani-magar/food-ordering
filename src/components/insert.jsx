import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddFoodItem = () => {
  const [foodData, setFoodData] = useState({
    fname: '',
    fdescription: '',
    fprice: '',
    fcategory_id: '',
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFoodData({
      ...foodData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fname', foodData.fname);
    formData.append('fdescription', foodData.fdescription);
    formData.append('fprice', foodData.fprice);
    formData.append('fcategory_id', foodData.fcategory_id);
    formData.append('image', image); // Append the image file

    try {
      const response = await axios.post(
        'http://localhost/php-rest-api/api-insert.php',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      );

      console.log('API Response:', response.data);

      if (response.data && response.data.status) {
        toast.success(response.data.message); // Display success message
      } else {
        toast.error(response.data?.message || 'An unexpected error occurred');
      }
    } catch (error) {
      console.error('Error inserting record:', error);
      toast.error('An error occurred while inserting the record');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Food Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="fname">
              Food Name
            </label>
            <input
              type="text"
              id="fname"
              name="fname"
              value={foodData.fname}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter food name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="fdescription">
              Description
            </label>
            <textarea
              id="fdescription"
              name="fdescription"
              value={foodData.fdescription}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter description"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="fprice">
              Price
            </label>
            <input
              type="number"
              id="fprice"
              name="fprice"
              value={foodData.fprice}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter price"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="fcategory_id">
              Category ID
            </label>
            <input
              type="number"
              id="fcategory_id"
              name="fcategory_id"
              value={foodData.fcategory_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter category ID"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Add Food Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFoodItem;
