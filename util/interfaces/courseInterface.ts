interface CourseInterface{
    id: string;
    instructor:{
        name:string
    }; 
    instructorId: string;
    courseName: string;
    description: string;
    price:number,
    startDate:string,
    duration:string,
}

export default CourseInterface;