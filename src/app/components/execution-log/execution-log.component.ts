import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-execution-log',
  imports: [
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './execution-log.component.html',
  styleUrl: './execution-log.component.scss',
  standalone: true,
})
export class ExecutionLogComponent {

  @Input()
  logs: string[] = [];


  /**
   * Has logs
   */
  get hasLogs(): boolean {
    return !!this.logs.length;
  }
}
