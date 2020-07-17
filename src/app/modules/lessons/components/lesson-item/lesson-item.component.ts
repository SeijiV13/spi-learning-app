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

  convertTime(val, pad, length) {
    return (new Array(length + 1).join(pad) + val).slice(-length);
  }

  getTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;

    return  this.convertTime(minutes, '0', 2) + ':' + this.convertTime(seconds, '0', 2);
  }

}
