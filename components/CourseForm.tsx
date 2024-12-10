
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

const CourseForm = ({instructorId}:{instructorId:string}) => {
  const [courseName, setCourseName] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [startDate, setStartDate] = useState('');
  const [duration, setDuration] = useState<number | string>('');

  const handleSubmit = async () => {
    if (Number(duration) <= 0 && Number(price) <=0) {
      toast.error('Must be greater than 0');
      return;
    }
    const courseData = {
      courseName,
      thumbnailUrl,
      description,
      price,
      startDate,
      duration,
      instructorId
    };
    const response = await axios.post(`api/create_course`,courseData);
    console.log(response.data.status)
    if(response.data.status!==200){
      return toast.error(response.data.message);
    }else{
      return toast.success(response.data.message);
    }
  };
console.log("e")
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

        {/* Thumbnail URL Input */}
        <div className="mb-4">
          <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-700">
            Thumbnail URL
          </label>
          <input
            id="thumbnailUrl"
            type="url"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter thumbnail URL"
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
            Duration (months)
          </label>
          <input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter course duration"
            required
          />
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
