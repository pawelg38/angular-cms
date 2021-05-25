import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDragndrop]'
})
export class DragndropDirective {
  @HostBinding('class.fileOver') fileOver: boolean;
  @Output() fileDropped = new EventEmitter<any>();

  @HostListener('dragover', ['$event']) onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    this.fileOver = true;
  }
  @HostListener('dragleave', ['$event']) public onDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    this.fileOver = false;
  }
  @HostListener('drop', ['$event']) public ondrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.fileOver = false;
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }

  constructor() { }

}
