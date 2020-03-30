import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-group-case',
  templateUrl: './group-case.component.html',
  styleUrls: ['./group-case.component.scss']
})
export class GroupCaseComponent {

    @Input() title: string;
    @Input() totalSick: number;
    @Input() totalClosed: number;

}
