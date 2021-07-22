import { Injectable } from '@angular/core';
import { PostService } from './post.service';

@Injectable()
export class PaginationService {

  //lastNews: Array<number> = this.postService.
  constructor(private postService: PostService) {

  }
}
