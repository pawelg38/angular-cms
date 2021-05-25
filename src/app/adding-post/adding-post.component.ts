import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adding-post',
  templateUrl: './adding-post.component.html',
  styleUrls: ['./adding-post.component.scss']
})
export class AddingPostComponent implements OnInit {
  public files: any[] = [];

  constructor() { }

  onFileDropped(e) {
    console.log("step1");
    console.log(e);
    for (const item of e) {
      this.files.push(item);
    }
  }
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  ngOnInit(): void {
  }

}
