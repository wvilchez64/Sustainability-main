import {SortColumn, SortDirection} from './sort-columns-header.directive';

export interface goalsStateI {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: SortColumn;
    sortDirection: SortDirection;
}