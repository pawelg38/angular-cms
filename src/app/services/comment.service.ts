import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  commentsAmount: number;

  comments: Array<Comment> = [
    {
      post: '7',
      id: '1',
      name: 'Paweł Graboś',
      role: 'admin',
      content: 'Przykladowy komentarz',
      img: 'https://www.gravatar.com/avatar/6ff77b82c5d1037e052e6b284dc90045.jpg?s=64'
    }
  ];

  constructor() {
    this.commentsAmount = this.comments.length;
  }

  getComments(postId: string): Array<Comment> {
    return this.comments.filter(e => e.post === postId);
  }
  setComments(comments: Array<Comment>): void {
    this.comments = comments;
  }
  setCommentsAmount(x: number): void {
    this.commentsAmount -= 1;
  }
  getCommentsAmount(): number {
    return this.commentsAmount;
  }
  editComent(l: Comment): void {
    this.comments[l.id] = l;
  }
  addComment(test: string): void {
    const l = this.comments[0];
    l.content = test;
    l.id += 1;
    this.comments.push(l);
  }
}
