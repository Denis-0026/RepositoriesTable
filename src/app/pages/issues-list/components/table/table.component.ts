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
import { IssueItem } from '@app/shared/table/interfaces';

@Component({
  selector: 'app-issues-list-table',
  standalone: true,
  imports: [CommonModule, MatSortModule, MatProgressSpinnerModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  @Input() data$: Observable<IssueItem[] | null> = of([]);
  @Input() loading$: Observable<boolean> = of(false);
  @Input() selectedRows$: Observable<IssueItem[]> = of([]);

  @Output() readonly currentSort = new EventEmitter<Sort>();
  @Output() readonly selectedRow = new EventEmitter<IssueItem>();

  private selectedRows: IssueItem[] = [];

  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.createSelectedRowsSubscription();
  }

  setCurrentSort(currentSort: Sort): void {
    this.currentSort.next(currentSort);
  }

  selectRow(row: IssueItem): void {
    this.selectedRow.emit(row);
  }

  checkSelectedRow(row: IssueItem): boolean {
    return this.selectedRows.findIndex((x) => x.id === row.id) > -1;
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
