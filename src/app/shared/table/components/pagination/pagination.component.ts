import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

import { PaginationData } from '@app/shared/table/interfaces';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatSelectModule, MatIconModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input() paginationData$: Observable<PaginationData | null> | null = null;

  @Output() readonly currentPageURL = new EventEmitter<string | null>();
  @Output() readonly currentPageSize = new EventEmitter<number>();

  public pageSizeList: number[] = [10, 50, 100];
  public selectedPageSize: number = 10;

  changePageURL(currentPageURL: string | null): void {
    if (currentPageURL !== null) this.currentPageURL.next(currentPageURL);
  }

  changePageSize(currentPageSize: MatSelectChange): void {
    this.selectedPageSize = currentPageSize.value;
    this.currentPageSize.next(this.selectedPageSize);
  }
}
