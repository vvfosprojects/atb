import { Component } from '@angular/core';
import { CounterInterface } from '../../interface/counters.interface';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {

    counter: CounterInterface;

}
