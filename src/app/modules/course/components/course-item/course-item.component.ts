import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css']
})
export class CourseItemComponent implements OnInit {
  @Input() src = "";
  @Input() title = '';
  @Input() videoCount = 0;
  constructor() { }

  ngOnInit() {
  }

}
