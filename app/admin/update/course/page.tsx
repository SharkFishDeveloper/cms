"use client"
import { useSearchParams } from "next/navigation";

const UpdateCourse = () => {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id"); // Extract 'id' from the URL

  return (
    <div>
      <h1>Update Course</h1>
      <p>Course ID: {courseId}</p>
      <p>Do it later</p>
    </div>
  );
};

export default UpdateCourse;
