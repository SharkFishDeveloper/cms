interface CourseInterface{
    id: string;
    instructor:{
        name:string
    }; 
    instructorId: string;
    thumbnailUrl: string;
    courseName: string;
    description: string;
    price:number,
    startDate:string,
    duration:true,
}

export default CourseInterface;