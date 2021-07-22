import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { observable, Observable, fromEvent, interval, Subject, AsyncSubject, BehaviorSubject } from 'rxjs';
import { switchMap, take, takeUntil, takeWhile } from 'rxjs/operators';
import { Comment } from '../models/comment';
import { Post } from '../models/post';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentData, DocumentSnapshot, QueryDocumentSnapshot, QueryFn, QuerySnapshot } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
// @Injectable()
export class PostService {
  private pageId: number;
  public postsAmount;
  public getPost$: Observable<Post>;
  private postsCollection2;
  private postsCollection$;
  public tempArray2: Array<Post> = [];
  public tempArray3: Subject<any> = new Subject();
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private storage: AngularFireStorage,
    private fbDB: AngularFirestore,
  ) {}
  getPost(id: number) {
    this.getPost$ = new Observable((observer) => {
      this.fbDB.collection('posts',ref => ref.where('id', '==', id))
      .get().subscribe({
        next: x => {
          x.forEach((doc:QueryDocumentSnapshot<Post>) => {
            observer.next(doc.data());
          });
        }
      })
    })
  }
  public postsAmount$ = new Observable((observer) => {
    if(this.authService.fireAuthUser) {
      var postsCollectionSub = this.fbDB.collection('posts').valueChanges()
      .subscribe({
        next: (x) => {
          observer.next(x.length);
        }
      });
    }
    return {
      unsubscribe() {
        postsCollectionSub.unsubscribe();
      }
    };
  });
  
  public getPosts$ = new Observable((observer) => {
    let tempArray: Array<Post> = [];
    let pageId = parseInt(this.router.url.slice(1)) ? parseInt(this.router.url.slice(1)) : 1;
    var firstSub;
    var nextSub;
    var postsAmountSub;
    var authServiceSub;


    postsAmountSub = this.postsAmount$.subscribe({
      next: (x:number) => 
      {
        var first;
        if(pageId*3 >= x) {
          first = this.fbDB.collection('posts', ref => ref.limit(1).orderBy("createdAt"));
        }
        else if(pageId*3 < x) {
          first = this.fbDB.collection('posts', ref => ref.limit(x-pageId*3).orderBy("createdAt"));
        }
        authServiceSub = this.authService.fireAuthUser.subscribe( b => {
          if (b) {
            firstSub = first.get().subscribe( documentSnapshots => {
              var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
              var next;
              if (pageId*3 >= x) {
                next = this.fbDB.collection('posts', ref => ref.limit(3).orderBy("createdAt", 'asc').startAt(lastVisible));
              }
              else if(pageId*3 < x) {
                // this.authService.fireAuthUser.subscribe( x => {
                //   if (x) {
                next = this.fbDB.collection('posts', ref => ref.limit(3).orderBy("createdAt", 'asc').startAfter(lastVisible));
                //   }
                // })
              }
              nextSub = next.get().subscribe( x => {
                tempArray = [];
                x.forEach((doc:QueryDocumentSnapshot<Post>) => {
                  tempArray.push(doc.data());
                });
                observer.next(tempArray);
              })
            })
          }
        })
      }
    })
    return {
      unsubscribe() {
        nextSub.unsubscribe();
        firstSub.unsubscribe();
        postsAmountSub.unsubscribe();
        authServiceSub.unsubscribe();
      }
    };
  });
  // getComments(): Array<Comment> {
  //   let postNum = parseInt(this.router.url[this.router.url.length-1]);
  //   return postsArray.find(x => x.id == postNum.toString()).comments;
  // }
  // getCommentsAmount(): number {
  //   let postNum = parseInt(this.router.url[this.router.url.length-1]);
  //   return postsArray.find(x => x.id == postNum.toString()).comments.length;
  // }
  // savePost(updatedPost: Post): void {
  //   let postNum = parseInt(this.router.url[this.router.url.length-1]);
  //   postsArray[postNum] = updatedPost;
  //   localStorage.setItem(postsKey, JSON.stringify(postsArray));
  // }
  // deletePost(deletedPost: Post): void {
  //   let postNum = parseInt(this.router.url[this.router.url.length-1]);
  //   postsArray = postsArray.filter(e => +e.id !== postNum);
  //   localStorage.setItem(postsKey, JSON.stringify(postsArray));
  // }
  // addComment(comment: string): void {
  //   let tmpName: string;
  //   this.authService.authState().subscribe({
  //     next: (x) => {
  //       if (x) {
  //         tmpName = x.displayName;
  //       }
  //     }
  //   });
  //   let postNum = postsArray.length - parseInt(this.router.url[this.router.url.length-1]);
  //   postsArray[postNum]
  //     .comments.push({
  //       post: postNum.toString(),
  //       id: this.getComments().length.toString(),
  //       name: tmpName,
  //       role: 'guest',
  //       content: comment,
  //       img: '../../assets/img/guest-icon.jpg'
  //     });
  //   localStorage.setItem(postsKey, JSON.stringify(postsArray));
  //   //console.log(posts);
  // }
}