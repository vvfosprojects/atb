import { Component, Input } from '@angular/core';
import { CounterInterface } from '../../interface';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {

    @Input() counter: CounterInterface;

}
