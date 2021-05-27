import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject } from 'rxjs';

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
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: AngularFireStorage) {

      document.body.scrollTop = 0;
      
      this.route.params.subscribe(params => {
        this.pageId = params.id;
        if (parseInt(this.pageId) < 1) {
          this.router.navigate(['1']);
        }
        else if (this.postService.getLastPageNumber() < parseInt(this.pageId)) {
            this.router.navigate([this.postService.getLastPageNumber().toString()]);
        }
      });
      this.postService.getPosts$.subscribe({
        next: (x:Array<Post>) => {
          this.posts = x;
          this.posts.sort(this.comparePosts);
          this.updatePostsImagesPaths(this.posts);
        }
      })
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
  updatePostsImagesPaths(posts: Array<Post>) {
    let ref1 = this.storage.ref("posts/"+posts[0].id+"_min.jpg");
    let ref2 = this.storage.ref("posts/"+posts[1].id+"_min.jpg");
    let ref3 = this.storage.ref("posts/"+posts[2].id+"_min.jpg");
    let imgUrlObs1 = ref1.getDownloadURL();
    let imgUrlObs2 = ref2.getDownloadURL();
    let imgUrlObs3 = ref3.getDownloadURL();
    imgUrlObs1.subscribe({
        next: x => {
          posts[0].extraImg = new BehaviorSubject<string>('test');
          posts[0].extraImg.next(x);
        }
    })
    imgUrlObs2.subscribe({
        next: x => {
          posts[1].extraImg = new BehaviorSubject<string>('test');
          posts[1].extraImg.next(x);
        }
    })
    imgUrlObs3.subscribe({
        next: x => {
          posts[2].extraImg = new BehaviorSubject<string>('test');
          posts[2].extraImg.next(x);
        }
    })
  }
  refreshInputValue(event: any) {
    this.pageId = this.pageId || this.route.snapshot.url[0].path;
  }
  nextPage() {
    this.router.navigate([(parseInt(this.pageId)+1).toString()]);
  }
  previousPage() {
    this.router.navigate([(parseInt(this.pageId)-1).toString()]);
  }

  ngOnInit(): void {
  }
}
