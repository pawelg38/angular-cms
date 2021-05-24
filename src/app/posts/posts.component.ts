import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, DoCheck{

  posts: Array<Post> = [];
  pageId: string;
  sitesAmount: number;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router) {
      this.route.params.subscribe(params => {
        this.pageId = params.id;
        if (parseInt(this.pageId) < 1) {
          this.router.navigate(['1']);
        }
        else if (this.postService.getLastPageNumber() < parseInt(this.pageId)) {
            this.router.navigate([this.postService.getLastPageNumber().toString()]);
        }
        this.posts = this.postService.getPosts(this.pageId);
      });
      document.body.scrollTop = 0;
      this.sitesAmount = Math.ceil(postService.getPostsAmount()/3);
  }
  ngDoCheck(): void {
    if(this.route.snapshot.url[0].path !== this.pageId &&
      this.pageId !== null) {
      this.router.navigate([this.pageId]);
    }
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
