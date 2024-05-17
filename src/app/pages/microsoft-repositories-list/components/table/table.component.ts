import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatDialog } from '@angular/material/dialog';
import { IssuesListComponent } from '@app/pages/issues-list/components/issues-list.component';
import { RepositoryItem } from '@app/shared/table/interfaces';

@Component({
  selector: 'app-microsoft-repositories-list-table',
  standalone: true,
  imports: [CommonModule, MatSortModule, MatProgressSpinnerModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  @Input() data$: Observable<RepositoryItem[] | null> = of([]);
  @Input() loading$: Observable<boolean> = of(false);
  @Input() selectedRows$: Observable<RepositoryItem[]> = of([]);

  @Output() readonly currentSort = new EventEmitter<Sort>();
  @Output() readonly selectedRow = new EventEmitter<RepositoryItem>();

  private selectedRows: RepositoryItem[] = [];

  destroyRef = inject(DestroyRef);

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.createSelectedRowsSubscription();
  }

  setCurrentSort(currentSort: Sort): void {
    this.currentSort.next(currentSort);
  }

  selectRow(row: RepositoryItem): void {
    this.selectedRow.emit(row);
  }

  checkSelectedRow(row: RepositoryItem): boolean {
    return this.selectedRows.findIndex((x) => x.id === row.id) > -1;
  }

  openDialog(row: RepositoryItem): void {
    const destroyed = new Subject();

    this.destroyRef.onDestroy(() => {
      destroyed.next;
      destroyed.complete();
    });

    const dialogRef = this.dialog.open(IssuesListComponent, {
      data: { url: row.issues_url, name: row.full_name },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(destroyed))
      .subscribe((result) => {
        console.log('The dialog was closed');
      });
  }

  private createSelectedRowsSubscription(): void {
    const destroyed = new Subject();

    this.destroyRef.onDestroy(() => {
      destroyed.next;
      destroyed.complete();
    });

    this.selectedRows$.pipe(takeUntil(destroyed)).subscribe((rows) => {
      this.selectedRows = rows;
    });
  }
}
