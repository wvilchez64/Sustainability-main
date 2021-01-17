import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment'
const API = environment.apiServer

@Injectable({
  providedIn: 'root'
})

export class GoalsService {
  
  private getCampaignsByUserUrl = API + '/api/campaignsByUser/'
  
  constructor(private http: HttpClient) {  }

  getCampaignsByUser(userId) {
    return this.http.get<any>(this.getCampaignsByUserUrl + userId);
  }

}