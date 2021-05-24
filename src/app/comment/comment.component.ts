import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  id: string;
  comments: Array<Comment>;
  isCommentEdit: Array<boolean> = [false, false];

  constructor(
    private commentService: CommentService,
    private postService: PostService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;

      this.comments = this.postService.getComments();
      //console.log(this.isCommentEdit);
    });
  }

  checkRole(comment: string): string {
    //console.log(comment);

    return comment === 'admin' ? 'red' : ' #343a40';
  }

  editComment(el: Comment): void {
    this.isCommentEdit[+el.id - 1] = true;
  }
  saveComment(el: Comment): void {
    this.commentService.editComent(el);
    this.isCommentEdit[+el.id - 1] = false;
  }
  deleteComment(el: Comment): void {
    const l = this.comments.filter(e => e.id !== el.id);
    this.comments = l;
    this.commentService.setComments(l);
    this.commentService.setCommentsAmount(1);
  }

}
