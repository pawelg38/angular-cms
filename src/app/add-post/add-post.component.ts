import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, Validators } from '@angular/forms';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  public files: any[] = [];
  postTitle = new FormControl('');
  postContent = new FormControl('');
  //private lastPostID$;
  //private lastPostID;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private fbDB: AngularFirestore, private fbStorage: AngularFireStorage) {
    // this.lastPostID$ = fbDB.collection('LastPostID').valueChanges();
    // this.lastPostID$.subscribe({
    //   next: x => {
    //     this.lastPostID = x[0].lastPostID;
    //   }
    // });
  }

  onFileDropped(files) {
    for (const file of files) {
      this.files.push(file);
    }
  }
  fileBrowseHandler(files) {
    for (const file of files) {
      this.files.push(file);
      //const task = this.fbStorage.upload(item.name, item);
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

  getErrorMessage(input) {
    if(input) {
      if (input.hasError('required')) {
        return 'You must enter a value';
      }
      if (input.hasError('minlength')) {
        return 'You must enter at least 6 characters';
      }
      if (input.hasError('email')) {
        return 'You must enter a valid email address';
      }
    }
  }
  onSubmit() {
    this.postTitle = new FormControl(this.postTitle.value, [Validators.required, Validators.minLength(3)]);
    this.postContent = new FormControl(this.postContent.value, [Validators.required, Validators.minLength(3)]);
    if (this.postTitle.hasError('required') ||
        this.postTitle.hasError('minlength') ||
        this.postContent.hasError('required') ||
        this.postContent.hasError('minlength')) {

          setTimeout(() => {
          }, 200);
          return;
    }
    if(this.files.length == 0) {
      return;
    }
    for (const file of this.files) {
      const filePath = 'posts/'+file.name;
      const fileRef = this.fbStorage.ref(filePath);
      const task = this.fbStorage.upload(filePath, file);
      
      this.uploadPercent = task.percentageChanges();
      this.uploadPercent.subscribe(x=>console.log(x));
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(x=>console.log(x));
          this.fbDB.collection('posts').add(
            {
              // id: this.lastPostID+1,
              title: this.postTitle.value,
              content: {
                akapit1: this.postContent.value,
                akapit2: this.postContent.value,
                akapit3: this.postContent.value,
              },
              minImg: this.files[0].name,
              hdImg: this.files[0].name,
              createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }
          );
          console.log("dopiero teraz");
          //this.fbDB.collection('LastPostID').doc('UjETLjVLR5oe9LqHASH9').update({lastPostID: this.lastPostID+1});
        })
      // ).subscribe(x => console.log(x.ref.getDownloadURL().then(x=>console.log(x))));
      ).subscribe();
    }
  }

  ngOnInit(): void {
  }

}
