import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input()
  public isShown;

  @Input()
  public lesson = {
    name: '',
    date: '',
    lecturer: '',
  };

  @Output()
  public cancel: EventEmitter <boolean> = new EventEmitter();
  @Output()
  public lessonChanged: EventEmitter <Object> = new EventEmitter();

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
