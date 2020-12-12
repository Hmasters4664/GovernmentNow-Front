import axios from 'axios';
import history from "./services/history";
import TokenStore from './services/tokenservice';
const authAxios = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials:true,
    Headers: {
        "Content-type": "application/json",
    }
});

authAxios.interceptors.response.use(
    function(response){
        return response
    },
    error =>{
        console.log(error)
        const errorResponse = error.config
        if (error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
            errorResponse.__retry = true;
            history.push("/login");
            window.location.reload();
          }

          return Promise.reject(error)
    }
)


  function resetTokenAndReattemptRequest(error)
  {
    
        axios.post('http://173.249.24.106:9090/api/token/refresh/',{refresh: TokenStore.getRefreshToken() }
        ).then(response =>{
            if (response.status === 200)
            {
                localStorage.setItem("token",response.data.access);
                return authAxios(error)
            }else{
                return Promise.reject(response)
            
            }
        })
}

export default authAxios


  