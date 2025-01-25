"use client"
import { BACKEND_URL } from "@/util/BCD";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const UpdateCourse = () => {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("id"); 
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, quality: string) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFiles((prevFiles) => {
        const newFiles = prevFiles.filter((f) => !f.name.includes(quality));
        return [...newFiles, file];
      });
    }
  };

  const handleUpload = async () => {
    try {
      const preSignedUrls: Record<string, string> = {};
  
      // Iterate through the required qualities
      for (const quality of ["1080", "720", "480"]) {
        // Set the object key for each video quality (replace with actual file name if necessary)
        const objectKey = `courses/${courseId}/videos/111111/${quality}/video.mp4`;
        console.log(objectKey);
  
        // Fetch pre-signed URL from the backend
        const response = await axios.post(`${BACKEND_URL}/g-purl`, {
          fileName: JSON.stringify(objectKey),
        });
        console.log(response.data);
  
        if (response.data.status !== 200) {
          return toast.error("Failed to generate pre-signed URL");
        }
  
        const data = response.data.signedUrl;
        preSignedUrls[quality] = data; // Store the URL for each quality
        console.log(`Pre-signed URL for ${quality}:`, preSignedUrls[quality]);
      }
  
      // Iterate through the qualities and check for the selected video file
      for (const quality of ["480"]) {
        const file = selectedFiles.find((file) =>
          file.name.toLowerCase().includes(quality)
        );
  
        if (file) {
          const url = preSignedUrls[quality];
          await uploadToCloudflareR2(url, file);  // Upload the video directly to Cloudflare R2
          console.log(`${file.name} uploaded successfully to ${quality}`);
        } else {
          toast.error(`Video file for ${quality} is missing`);
        }
      }
  
      toast.success("All videos uploaded successfully!");
    } catch (error) {
      console.log("Error during upload:", error);
      toast.error("Error during upload. Please try again.");
    }
  };
  
  const uploadToCloudflareR2 = async (url: string, file: File) => {
    console.log("Uploading for ", url);
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log("Upload failed:", error);
      toast.error(`Failed to upload ${file.name}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Update Course</h1>
        <p className="text-sm text-gray-700 mb-4">
          <strong>Course ID:</strong> {courseId}
        </p>
        <p className="text-md text-gray-800 mb-4">Edit Course Details</p>

        {/* Edit Video Section */}
        <div className="mb-6">
          <p className="text-md font-medium text-gray-800 mb-2">Edit Video</p>

          {/* Video upload for each quality */}
          {["1080p", "720p", "480p"].map((quality) => (
            <div key={quality} className="mb-4">
              <label
                htmlFor={`video-upload-${quality}`}
                className="block text-sm font-medium text-blue-600 cursor-pointer mb-2"
              >
                Select {quality} Video
              </label>
              <input
                type="file"
                id={`video-upload-${quality}`}
                accept="video/*"
                onChange={(event) => handleFileChange(event, quality)}
                className="block w-full text-sm text-gray-600 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}

          <button
            onClick={handleUpload}
            className="mt-4 w-full bg-green-500 text-white py-2 rounded-md text-sm hover:bg-green-600 focus:outline-none"
          >
            Upload Video
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCourse;
