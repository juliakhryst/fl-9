import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})

export class LessonComponent implements OnInit {
  public isFormShown = false;
  public lessons = [];

  constructor() { }

  ngOnInit() {
  }

  public addFormToggle() {
    this.isFormShown = !(this.isFormShown);
  }

  public addLesson(lesson) {
    lesson.id = this.lessons.length + 1;
    this.lessons.push(lesson);
    this.addFormToggle();
  }

  public deleteItem(currentLesson) {
    this.lessons.forEach((item, index) => {
      if (item.id === currentLesson.id) {
        this.lessons.splice(index, 1);
      }
    });
  }

  public toggleEdit(currentLesson) {
    const editIndex = this.lessons.findIndex(lesson =>
      lesson.id === currentLesson.id);
    this.lessons[editIndex].isEdited = !this.lessons[editIndex].isEdited;
  }

}


