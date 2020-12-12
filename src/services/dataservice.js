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
myapplications(){
    return http.get('/apply/myapplications', {headers:{"Authorization": "Bearer "+ TokenStore.getToken()}} );
}

dashboard(){
    return http.get('/dashboard/dashboard');
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
    return http.post(`/apply/upload?pk=${localStorage.getItem("upload_id")}`,fileData, {headers:{"Authorization": "Bearer "+ TokenStore.getToken()}} );
}

getProfile(){
    return http.get('/doc/profile', {headers:{"Authorization": "Bearer "+ TokenStore.getToken()}} );
}


registerIssue(data){
    return http.post('/ticket/create', data ,{headers:{"Authorization": "Bearer "+ TokenStore.getToken()}} );
}

createApplication(data){
    return http.post('/apply/new', data ,{headers:{"Authorization": "Bearer "+ TokenStore.getToken()}} );
}




}

export default new MedicalDataService();