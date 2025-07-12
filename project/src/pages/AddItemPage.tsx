import React, { useState } from 'react';
import { Upload, X, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AddItemPageProps {
  setCurrentPage: (page: string) => void;
}

const AddItemPage: React.FC<AddItemPageProps> = ({ setCurrentPage }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'tops',
    type: 'unisex',
    size: '',
    condition: 'gently-used',
    tags: ''
  });
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) {
    setCurrentPage('auth');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In a real app, you would upload to a cloud service
      // For demo, we'll use placeholder images
      const newImages = Array.from(files).slice(0, 5 - images.length).map((_, index) => 
        `https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400`
      );
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const calculatePointsValue = () => {
    let basePoints = 20;
    
    // Condition multiplier
    const conditionMultipliers = {
      'new': 1.5,
      'like-new': 1.3,
      'gently-used': 1.0,
      'well-worn': 0.7
    };
    
    // Category multiplier
    const categoryMultipliers = {
      'outerwear': 1.4,
      'dresses': 1.2,
      'shoes': 1.3,
      'accessories': 0.8,
      'tops': 1.0,
      'pants': 1.1
    };

    return Math.round(basePoints * 
      conditionMultipliers[formData.condition as keyof typeof conditionMultipliers] * 
      categoryMultipliers[formData.category as keyof typeof categoryMultipliers]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In a real app, this would submit to your backend
    alert('Item submitted for review! It will appear in the marketplace once approved.');
    setCurrentPage('dashboard');
  };

  const categories = [
    { value: 'tops', label: 'Tops' },
    { value: 'pants', label: 'Pants' },
    { value: 'outerwear', label: 'Outerwear' },
    { value: 'dresses', label: 'Dresses' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'shoes', label: 'Shoes' }
  ];

  const types = [
    { value: 'men', label: 'Men' },
    { value: 'women', label: 'Women' },
    { value: 'unisex', label: 'Unisex' },
    { value: 'kids', label: 'Kids' }
  ];

  const conditions = [
    { value: 'new', label: 'New with tags' },
    { value: 'like-new', label: 'Like new' },
    { value: 'gently-used', label: 'Gently used' },
    { value: 'well-worn', label: 'Well worn' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">List a New Item</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Photos (up to 5)
              </label>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                
                {images.length < 5 && (
                  <label className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Add Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              
              <p className="text-sm text-gray-500 mt-2">
                Upload clear, well-lit photos showing the item's condition. First photo will be the main image.
              </p>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g., Vintage Denim Jacket"
                />
              </div>

              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-2">
                  Size *
                </label>
                <input
                  type="text"
                  id="size"
                  name="size"
                  required
                  value={formData.size}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="e.g., M, L, 32, 8"
                />
              </div>
            </div>

            {/* Category and Type */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Type *
                </label>
                <select
                  id="type"
                  name="type"
                  required
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                >
                  {types.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-2">
                  Condition *
                </label>
                <select
                  id="condition"
                  name="condition"
                  required
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                >
                  {conditions.map(condition => (
                    <option key={condition.value} value={condition.value}>{condition.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Describe the item's condition, style, fit, and any other relevant details..."
              />
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                Tags (optional)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="vintage, casual, summer, professional (comma separated)"
              />
              <p className="text-sm text-gray-500 mt-1">
                Add tags to help others find your item. Separate with commas.
              </p>
            </div>

            {/* Points Value Display */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-emerald-900">Estimated Points Value</h3>
                  <p className="text-sm text-emerald-700">Based on category and condition</p>
                </div>
                <div className="text-2xl font-bold text-emerald-600">
                  {calculatePointsValue()} points
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                disabled={isSubmitting || images.length === 0}
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Submitting...' : 'Submit for Review'}
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage('dashboard')}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-700 text-sm">
                <strong>Review Process:</strong> All items are reviewed by our team to ensure quality and appropriateness. 
                This usually takes 24-48 hours. You'll be notified once your item is approved and live on the marketplace.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItemPage;