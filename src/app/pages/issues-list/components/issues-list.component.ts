import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

import { IssuesListService } from '../services/issues-list.service';
import { IssuesAPIService } from '@app/shared/table/services';
import { TableComponent } from './table/table.component';
import { IssueItem, PaginationData } from '@app/shared/table/interfaces';
import { PaginationComponent } from '@app/shared/table/components';

@Component({
  selector: 'app-issues-list',
  standalone: true,
  imports: [
    PaginationComponent,
    TableComponent,
    MatDialogContent,
    HttpClientModule,
    MatIconModule,
    MatDialogClose,
  ],
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [IssuesListService, IssuesAPIService],
})
export class IssuesListComponent {
  public issuesList$: Observable<IssueItem[] | null> =
    this.issuesListService.data$;

  public loading$: Observable<boolean> = this.issuesListService.loading$;

  public paginationData$: Observable<PaginationData | null> =
    this.issuesListService.paginationData$;

  public selectedRows$: Observable<IssueItem[]> =
    this.issuesListService.selectedRows$;

  constructor(
    public dialogRef: MatDialogRef<IssuesListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { url: string; name: string },
    private issuesListService: IssuesListService
  ) {}
  ngOnInit(): void {
    this.setCurrentPageURL(this.data.url);
  }

  setCurrentPageSize(currentPageSize: number): void {
    this.issuesListService.setCurrentPageSize(currentPageSize);
  }

  setCurrentPageURL(currentPageURL: string | null): void {
    this.issuesListService.setCurrentPageURL(currentPageURL);
  }

  setSelectedRows(row: IssueItem): void {
    this.issuesListService.updateSelectedRows(row);
  }
}
