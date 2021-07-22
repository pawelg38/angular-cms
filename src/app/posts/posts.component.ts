import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  public posts: Array<Post> = [];
  pageId: string;
  sitesAmount: number;
  public test=0;
  public sub;
  public sub2;
  public sub3;

  ngOnDestroy(): void {
    console.log("ngOnDestroy() runs");
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }

  constructor(
    private authService: AuthService,
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: AngularFireStorage) {
      console.log("constructor() runs");

      document.body.scrollTop = 0;
      
      this.sub3 = this.route.params.subscribe(params => {
        this.pageId = params.id;
        console.log(this.pageId);
        console.log("cos1");
        this.sub = this.postService.getPosts$.subscribe({
          next: (x:Array<any>)=> {
            console.log("cos2");
            console.log(x);
            this.test = x.length;
            this.posts = x;
            this.posts.reverse();
            this.updatePostsImagesPaths(this.posts[0]);
            this.updatePostsImagesPaths(this.posts[1]);
            this.updatePostsImagesPaths(this.posts[2]);
          },
          complete: () => {
            console.log("complete");
          }
        })
      });
      this.sub2 = this.postService.postsAmount$.subscribe({
        next: (snap: number) => {
          this.sitesAmount = Math.ceil(snap/3);
        }
      })
  }
  comparePosts(a:Post, b:Post) {
    if (a.id < b.id)
       return 1
    if (a.id > b.id)
       return -1
    return 0
 }
  updatePostsImagesPaths(posts: Post) {
    let d = this.storage.ref("posts/"+posts.minImg).getDownloadURL().subscribe({
      next: x => {
        posts.minImg = x;
        posts.isReady = true;
        d.unsubscribe();
      }
    });
  }
  refreshInputValue(event: any) {
    this.pageId = this.pageId || this.route.snapshot.url[0].path;
  }
  nextPage() {
      console.log(this.sitesAmount);
        if (parseInt(this.pageId) < this.sitesAmount) {
          console.log("no i co?: ", this.sitesAmount);
          this.sub.unsubscribe();
          this.router.navigate([(parseInt(this.pageId)+1).toString()]);
        }
  }
  previousPage() {
    console.log("step1", this.pageId);
    if (parseInt(this.pageId) > 1) {
      console.log("step2", this.pageId);
      this.sub.unsubscribe();
      this.router.navigate([(parseInt(this.pageId)-1).toString()]);
    }
  }

  ngOnInit(): void {
    console.log("ngOnInit() runs");
  }
}
