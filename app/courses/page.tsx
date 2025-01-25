"use client";
import CourseInterface from "@/util/interfaces/courseInterface";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Course = () => {
  const [courses, setCourses] = useState<CourseInterface[]>([]);
  const [detailsVisible, setDetailsVisible] = useState<Record<string, boolean>>({});
  const { data: session } = useSession();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/courses");

        if (response.data.status !== 200) {
          toast.error(response.data.message || "Failed to fetch courses");
        } else {
          const parsedCourses = JSON.parse(response.data.courses);
          if (Array.isArray(parsedCourses)) {
            setCourses(parsedCourses);
          } else {
            toast.error("Invalid courses format");
          }
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Try again after some time");
      }
    };
    fetchCourses();
  }, []);

  const toggleDetails = (id: string) => {
    setDetailsVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleBuy = (courseId: string) => {
    if (!session) {
      toast.error("You need to be logged in to buy a course!");
      return;
    }
    toast.success(`Successfully purchased course with ID: ${courseId}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {courses.length > 0 ? (
        courses.map((course) => {
          const isPurchased = session?.user?.id === course.instructorId; 
          return (
            <div
              key={course.id}
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {course.courseName.charAt(0).toUpperCase() + course.courseName.slice(1)}
              </h3>
              {detailsVisible[course.id] && (
                <p className="text-sm text-gray-600 mt-2">{course.description}</p>
              )}
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700">Instructor ID: {course.instructorId}</p>
                <p className="text-sm text-gray-500">Duration: {course.duration} months</p>
                <p className="text-sm text-gray-500">
                  Start Date: {new Date(course.startDate).toLocaleDateString()}
                </p>
                <p className="text-sm font-bold text-gray-800 mt-2">₹{course.price}</p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => toggleDetails(course.id)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  {detailsVisible[course.id] ? "Hide Details" : "View Details"}
                </button>
                {isPurchased ? (
                  <button className="bg-gray-500 text-white py-2 px-4 rounded-md cursor-not-allowed">
                    Purchased
                  </button>
                ) : (
                  <button
                    onClick={() => handleBuy(course.id)}
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none"
                  >
                    Buy
                  </button>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
};

export default Course;
