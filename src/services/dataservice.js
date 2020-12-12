import http from "../http.common";
import TokenStore from '../services/tokenservice';


class MedicalDataService{
    register(data){
        return http.post("/doc",data);
    }

    login(data){
       
        return http.post("/api/token/",data).then(response =>{
            if (response.data){
               localStorage.setItem("government_token",response.data.access);
               localStorage.setItem("government_token_refresh_token",response.data.refresh);               
            }
            return response.data

        });
   }


myTickets(){
    return http.get('/ticket/mytickets', {headers:{"Authorization": "Bearer "+ TokenStore.getToken()}} );
}

ticketArea(area){
    return http.get(`/ticket/area?suburb=${area}`, {headers:{"Authorization": "Bearer "+ TokenStore.getToken()}} );
}
myapplications(search){
    return http.get('/doc/search', {headers:{"Authorization": "Bearer "+ TokenStore.getToken()}} );
}

dashboard(){
    return http.get(`/doc/dashboard?pk=${localStorage.getItem("PATIENT_ID")}`, {headers:{"Authorization": "Bearer "+ TokenStore.getToken()}} );
}

images(){
    return http.get(`/doc/images?pk=${localStorage.getItem("PATIENT_ID")}`, {headers:{"Authorization": "Bearer "+ TokenStore.getToken()}} );
}

perscription(){
    return http.get(`/doc/perscription?pk=${localStorage.getItem("PATIENT_ID")}`, {headers:{"Authorization": "Bearer "+ TokenStore.getToken()}} );
}

conditions(){
    return http.get(`/doc/conditions?pk=${localStorage.getItem("PATIENT_ID")}`, {headers:{"Authorization": "Bearer "+ TokenStore.getToken()}} );
}

request(id){
    return http.post(`/doc/request?pk=${id}`,"",{headers:{"Authorization": "Bearer "+ TokenStore.getToken()}} );
}

upload(fileData){
    return http.post(`/doc/patientUpload?pk=${localStorage.getItem("PATIENT_ID")}`,fileData, {headers:{"Authorization": "Bearer "+ TokenStore.getToken()}} );
}

getProfile(){
    return http.get('/doc/profile', {headers:{"Authorization": "Bearer "+ TokenStore.getToken()}} );
}


updateProfile(data){
    return http.put('/doc/profile', data ,{headers:{"Authorization": "Bearer "+ TokenStore.getToken()}} );
}




}

export default new MedicalDataService();