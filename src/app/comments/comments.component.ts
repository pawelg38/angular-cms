import { AfterViewChecked, Component, DoCheck } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { PostService } from '../services/post.service';
import { Comment } from '../models/comment'
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {

  commentsAmount: number;
  test = '';
  isLoggedIn: boolean = false;

  constructor(
    private commentService: CommentService,
    private postService: PostService,
    private accountService: AccountService
  ) {
    this.accountService.userSubject.subscribe(x => {
      if(x) {
        this.isLoggedIn = true;
      }
      else {
        this.isLoggedIn = false;
      }
    })
    this.commentsAmount = this.postService.getCommentsAmount();

  }
  addComment(): void {
    this.commentService.addComment(this.test);
    this.postService.addComment(this.test);
    this.commentsAmount = this.postService.getCommentsAmount();
  }
}
