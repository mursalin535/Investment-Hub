export async function SendingReq(data) {
    try {
        const res = await fetch('http://localhost:5009/deal/request/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return await res.json();
    }
    catch (err) {
        console.log('error occured in server:', err);
    }
}

export async function GetReqStatus(id, role) {
    try {
        const res = await fetch(
            `http://localhost:5009/reqstat/${id}/${role}`
        );

        return await res.json();
    }
    catch (err) {
        console.log('error occured in server:', err);

        return {
            success: false,
            data: []
        };
    }
}

export async function RequestInfo(ad_id){

    try{
        const res=await fetch(`http://localhost:5009/requestlist/${ad_id}`)
        const data=await res.json();
        return data;
    }
    catch(err){
        console.log("error occured in server:",err);
        
    }

}