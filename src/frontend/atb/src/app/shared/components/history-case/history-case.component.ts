import { Component, Input } from '@angular/core';
import { HistoryCaseInterface } from '../../interface';

@Component({
  selector: 'app-history-case',
  templateUrl: './history-case.component.html',
  styleUrls: ['./history-case.component.scss']
})
export class HistoryCaseComponent {

    @Input() historyCase: HistoryCaseInterface[];

}
