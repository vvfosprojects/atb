import { Component, Input } from '@angular/core';
import { RssInterface } from '../../interface';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent {

    @Input() rssData: RssInterface[];

}
