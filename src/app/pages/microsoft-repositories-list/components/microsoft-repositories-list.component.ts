import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';

import { TableComponent } from './table/table.component';
import { MicrosoftRepositoriesService } from '../services/microsoft-repositories-list.service';
import { PaginationData, RepositoryItem } from '@app/shared/table/interfaces';
import { PaginationComponent } from '@app/shared/table/components';

@Component({
  selector: 'app-microsoft-repositories-list',
  standalone: true,
  imports: [TableComponent, PaginationComponent],
  templateUrl: './microsoft-repositories-list.component.html',
  styleUrl: './microsoft-repositories-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MicrosoftRepositoriesService],
})
export class MicrosoftRepositoriesListComponent {
  public microsoftRepositoriesList$: Observable<RepositoryItem[] | null> =
    this.microsoftRepositoriesService.data$;

  public paginationData$: Observable<PaginationData | null> =
    this.microsoftRepositoriesService.paginationData$;

  public loading$: Observable<boolean> =
    this.microsoftRepositoriesService.loading$;

  public selectedRows$: Observable<RepositoryItem[]> =
    this.microsoftRepositoriesService.selectedRows$;

  constructor(
    private microsoftRepositoriesService: MicrosoftRepositoriesService
  ) {}

  setCurrentPageURL(currentPageURL: string | null): void {
    this.microsoftRepositoriesService.setCurrentPageURL(currentPageURL);
  }

  setCurrentPageSize(currentPageSize: number): void {
    this.microsoftRepositoriesService.setCurrentPageSize(currentPageSize);
  }

  setCurrentSort(currentSort: Sort): void {
    this.microsoftRepositoriesService.setCurrentSort(currentSort);
  }

  setSelectedRows(row: RepositoryItem): void {
    this.microsoftRepositoriesService.updateSelectedRows(row);
  }
}
