import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { MicrosoftRepositoriesAPIService } from '@app/shared/table/services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HttpClientModule],
  templateUrl: './root.component.html',
  styleUrl: './root.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MicrosoftRepositoriesAPIService],
})
export class RootComponent {
  title = 'table';
}
