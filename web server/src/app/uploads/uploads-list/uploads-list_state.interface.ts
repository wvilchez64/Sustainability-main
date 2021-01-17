import {SortColumn, SortDirection} from './sort-columns-header.directive';

export interface uploadsListStateI {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: SortColumn;
    sortDirection: SortDirection;
}