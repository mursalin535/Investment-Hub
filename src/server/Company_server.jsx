export async function getCompany(){
    try{
        const res=await fetch('http://localhost:5009/companies');
        const data=await res.json();
        return data;
    }
    catch(err){
        console.log('error in the server:',err);
        return { success: false, data: [] };
    }
}

export async function yourCompany(userId){
    try{
        console.log('inside youCompany server with userId:', userId);
        const res=await fetch(`http://localhost:5009/companies/yourcompany/${userId}`);
        console.log('Response from server:', res);
        const data=await res.json();
        console.log('Data from server:', data);
        return data;
    }
    catch(err){
        console.log('error in the server:',err);
    
        return { success: false, data: [] };
    }
}