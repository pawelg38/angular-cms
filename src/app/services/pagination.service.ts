import { Injectable } from '@angular/core';
import { PostService, postServiceProvider } from './post.service';

@Injectable()
export class PaginationService {

  //lastNews: Array<number> = this.postService.
  constructor(private postService: PostService) {

  }
}
