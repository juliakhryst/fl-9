import { Component, OnInit, Input } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})

export class LessonComponent implements OnInit {
  public isFormShown = false;
  public lessons: any [];

  constructor( public localStorageService: LocalStorageService) { }

  ngOnInit() {
    if (this.localStorageService.getItem('lessons')) {
      this.lessons = this.localStorageService.getItem('lessons');
    } else {
      this.lessons = [];
    }

  }

  public addFormToggle() {
    this.isFormShown = !(this.isFormShown);
  }

  public addLesson(lesson) {
    lesson.id = Math.floor(Math.random() * 100000);
    this.lessons.push(lesson);
    this.addFormToggle();
    this.localStorageService.setItem('lessons', this.lessons);
  }

  public deleteItem(currentLesson) {
    this.lessons.forEach((item, index) => {
      if (item.id === currentLesson.id) {
        this.lessons.splice(index, 1);
      }
    });
    this.localStorageService.setItem('lessons', this.lessons);
  }

  public toggleEdit(currentLesson) {
    const editIndex = this.lessons.findIndex(lesson =>
      lesson.id === currentLesson.id);
    this.lessons[editIndex].isEdited = !this.lessons[editIndex].isEdited;
    this.localStorageService.setItem('lessons', this.lessons);
  }

}


