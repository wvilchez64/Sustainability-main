import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';  

import { environment } from '../../environments/environment'
const API = environment.apiServer

@Injectable({  
    providedIn: 'root'  
  })  
export class UploadsService { 
    private uploadUrl = API + '/api/uploadFile'
    
    constructor(private httpClient: HttpClient) { }

    public uploadFile(formData) {
      return this.httpClient.post(this.uploadUrl, formData, {  
                                                             responseType: 'text',
                                                             reportProgress : true,  
                                                             observe: 'events'  
                                                            });  
    }

    
}