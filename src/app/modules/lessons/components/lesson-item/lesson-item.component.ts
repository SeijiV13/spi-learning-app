import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lesson-item',
  templateUrl: './lesson-item.component.html',
  styleUrls: ['./lesson-item.component.css']
})
export class LessonItemComponent implements OnInit {
  @Input() src = '';
  @Input() videoTitle = '';
  @Input() description = '';
  @Input() length;
  constructor() { }

  ngOnInit() {
  }

}
