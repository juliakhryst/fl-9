import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public lesson: Object = {
    name: '',
    date: '',
    lecturer: '',
  };

  @Output()
  public cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  public lessonChanged: EventEmitter<Object> = new EventEmitter<Object>();

  constructor() { }

  ngOnInit() {
  }

  closeModal() {
    this.cancel.emit(true);
  }

  saveToList() {
    this.lessonChanged.emit(Object.assign({}, this.lesson));
  }


}
