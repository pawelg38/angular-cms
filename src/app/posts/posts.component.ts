import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  public posts: Array<Post> = [];
  pageId: string;
  sitesAmount: number;

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: AngularFireStorage) {

      document.body.scrollTop = 0;
      
      this.route.params.subscribe(params => {
        this.pageId = params.id;
        this.postService.postsAmount$.subscribe({
          next: x => {
            if (parseInt(this.pageId) < 1) {
              this.router.navigate(['1']);
            }
            else if (parseInt(this.pageId) > Math.ceil(x.size/3)) {
              this.router.navigate([(Math.ceil(x.size/3)).toString()]);
            }
            else {
              this.postService.getPosts$.subscribe({
                next: (x:Array<Post>) => {
                  this.posts = x;
                  this.posts.sort(this.comparePosts);
                  this.updatePostsImagesPaths(this.posts[0]);
                  this.updatePostsImagesPaths(this.posts[1]);
                  this.updatePostsImagesPaths(this.posts[2]);
                }
            })}
          }
        })
      });
      this.postService.postsAmount$.subscribe({
        next: snap => {
          this.sitesAmount = Math.ceil(snap.size/3);
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
    this.storage.ref("posts/"+posts.minImg).getDownloadURL().subscribe({
      next: x => {
        posts.minImg = x;
        posts.isReady = true;
      }
    });
  }
  refreshInputValue(event: any) {
    this.pageId = this.pageId || this.route.snapshot.url[0].path;
  }
  nextPage() {
    this.postService.postsAmount$.subscribe({
      next: x => {
        if (parseInt(this.pageId) < Math.ceil(x.size/3)) {
          this.router.navigate([(parseInt(this.pageId)+1).toString()]);
        }
      }
    })
  }
  previousPage() {
    if (parseInt(this.pageId) > 1) {
      this.router.navigate([(parseInt(this.pageId)-1).toString()]);
    }
  }

  ngOnInit(): void {
  }
}
