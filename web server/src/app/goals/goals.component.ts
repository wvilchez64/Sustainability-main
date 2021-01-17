import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { UserService } from '../core/user/user.service';
import { tokenUserI } from '../core/user/token-user-interface';
import { GoalsService } from './goals.service';

@Component({
    selector: 'sus-goals',
    templateUrl: './goals.component.html',
    styleUrls: ['./goals.component.css'],
})
export class GoalsComponent implements OnInit{
    isCampaignsLoad : boolean = false;
    isCampaignsHasError : boolean = true
    campaignSearch: string = ''
    campaignFilter: string = ''
    campaigns: Array<any> = []
    campaignId: number = -1
    userId: number = 0
    user: tokenUserI
    
    constructor(
      private router: Router,
      private toastr: ToastrService,
      private GoalsService: GoalsService,
      private userService: UserService,
      private location: Location,
      ) { }

    ngOnInit() : void {

      this.userService.getUser().subscribe(user => {
        if (user) {
          this.user = user
          this.userId = user.id
        }
      })
      
      this.isCampaignsLoad = true
      this.GoalsService
        .getCampaignsByUser(this.userId)
        .subscribe(
          res =>  {
            this.campaigns = res
            this.isCampaignsHasError = false
          },
          error => {
            this.isCampaignsHasError = true
            this.toastr.error("There are no campaigns")
          }
        )
      this.isCampaignsLoad = false
    }

    setCampaign(id) {
      this.campaignId = id
    }
    
    clearCampaign(){
      this.campaignId = -1
      this.campaignSearch = undefined
      this.campaignFilter = ''
    }
   
    close(){
      this.location.back()
    }
}    