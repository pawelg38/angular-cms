import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  id: string;
  post: Post;
  isPostEdit = false;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
    ) {
      this.route.params.subscribe(params => {
        this.id = params.id;
        this.post = this.postService.getPost(this.id);
      });
      document.body.scrollTop = 0;
    }

  ngOnInit(): void { }

  editPost(): void {
    this.isPostEdit = true;
  }
  savePost(): void {
    this.isPostEdit = false;
    this.postService.savePost(this.post);
  }
  deletePost(): void {
    this.postService.deletePost(this.post);
    this.router.navigate(['']);
  }

}
