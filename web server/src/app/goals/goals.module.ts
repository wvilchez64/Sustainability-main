import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CampaignsPipe } from './campaigns.pipe';
import { GoalsComponent } from './goals.component';
import { GoalsRoutingModule } from './goals.routing.module';
import { GoalsListModule } from './goals-list/goals-list.module';

@NgModule({
    declarations: [
        CampaignsPipe,
        GoalsComponent,
    ],
    imports: [ 
        CommonModule,
        RouterModule,
        FormsModule,
        GoalsRoutingModule,
        GoalsListModule
    ],
    exports: [
        GoalsComponent,
    ]
})
export class GoalsModule { }