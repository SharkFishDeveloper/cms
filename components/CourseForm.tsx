import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

const CourseForm = ({ instructorId }: { instructorId: string }) => {
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [startDate, setStartDate] = useState('');
  const [duration, setDuration] = useState<number | string>('');
  const [durationUnit, setDurationUnit] = useState<'months' | 'weeks'>('months');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Number(duration) <= 0 || Number(price) <= 0) {
      toast.error('Duration and price must be greater than 0');
      return;
    }
    const adjustedDuration = durationUnit === 'weeks' ? Number(duration) : Number(duration) * 4; // Assume 1 month = 4 weeks
    
    const courseData = {
      courseName,
      description,
      price,
      startDate,
      duration:adjustedDuration,
      instructorId,
    };

    try {
      const response = await axios.post(`api/create_course`, courseData);
      if (response.data.status !== 200) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('An error occurred while creating the course');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Make Course</h2>

      <form onSubmit={handleSubmit}>
        {/* Course Name Input */}
        <div className="mb-4">
          <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">
            Course Name
          </label>
          <input
            id="courseName"
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter course name"
            required
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter course description"
            rows={4}
            required
          ></textarea>
        </div>

        {/* Price Input */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price (₹)
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter course price"
            required
          />
        </div>

        {/* Start Date Input */}
        <div className="mb-4">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Duration Input */}
        <div className="mb-4">
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Duration ({durationUnit})
          </label>
          <input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Enter course duration in ${durationUnit}`}
            required
          />
        </div>

        {/* Duration Unit Toggle */}
        <div className="mb-4">
          <span className="block text-sm font-medium text-gray-700">Duration Unit</span>
          <div className="mt-2 flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="durationUnit"
                value="months"
                checked={durationUnit === 'months'}
                onChange={() => setDurationUnit('months')}
              />
              <span>Months</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="durationUnit"
                value="weeks"
                checked={durationUnit === 'weeks'}
                onChange={() => setDurationUnit('weeks')}
              />
              <span>Weeks</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
