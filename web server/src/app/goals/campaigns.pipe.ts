import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'campaignsFilter'
})
export class CampaignsPipe implements PipeTransform {

    transform(items: any[], campaignSearch: string): any[] {
        if (!items) {
            return [];
        }
        if (!campaignSearch) {
            return items;
        }
        campaignSearch = campaignSearch.toLowerCase();
        return items.filter(it => {
            return (it.description.toLowerCase().includes(campaignSearch));
        });
    }
}