const baseUrl = "http://localhost:3001/";

export async function getCourses(){
    const response = await fetch(baseUrl+'courses');
    if(response.ok) return response.json();
    throw response;
}

export async function saveCourse(){

}