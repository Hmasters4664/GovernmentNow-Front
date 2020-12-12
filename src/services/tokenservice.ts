import axios, { AxiosRequestConfig } from 'axios';

export class TokenStore{
     private static  LOCAL_STORAGE_TOKEN = 'government_token';
     private static  LOCAL_STORAGE_REFRESH_TOKEN = 'government_token';
    

      public static StoreAccessToken(token: string): void {
          return localStorage.setItem(TokenStore.LOCAL_STORAGE_REFRESH_TOKEN,token);
          
     }

     public static StoreRefreshToken(refreshtoken: string): void {
          return localStorage.setItem(TokenStore.LOCAL_STORAGE_REFRESH_TOKEN,refreshtoken);
     }

     private static getRefreshToken(): string | null {
          return localStorage.getItem(TokenStore.LOCAL_STORAGE_REFRESH_TOKEN);
        }
      
     private static getToken(): string | null {
          return localStorage.getItem(TokenStore.LOCAL_STORAGE_TOKEN);
        }
}

export default TokenStore;