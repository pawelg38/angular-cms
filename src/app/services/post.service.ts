import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';
import { Post } from '../models/post';
import { AccountService } from './account.service';

let posts: Array<Post> = [
  {
    id: '1',
    title: 'Super Cars Your Grandpas wont believe',
    img: '1.jpg',
    minImg: '1_min.jpg',
    medImg: '1_med.jpg',
    hdImg: '1_hd.jpg',
    content: {
      akapit1: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi esse et sunt, illo iure assumenda quaerat eaque dolor facere libero ipsam commodi eius iusto tempore, voluptas soluta laboriosam veniam ab ea a, consequuntur inventore nihil! Magni, mollitia obcaecati officiis voluptatibus illum deleniti ad adipisci nobis blanditiis pariatur suscipit eaque. In eligendi molestias voluptatum fuga beatae suscipit rerum ut temporibus quo, dolores accusantium, similique vitae eos illo earum. Itaque facere, adipisci, culpa beatae repellendus a porro consectetur ipsa nam temporibus officia sit! Animi ratione numquam doloremque voluptas voluptates porro dolor autem nam deserunt vitae in ex vel modi omnis laudantium recusandae, minus maiores aut eligendi reiciendis possimus.',
      akapit2: 'Optio assumenda perspiciatis quasi ullam corporis beatae consectetur vitae cum cumque delectus molestias ratione molestiae voluptatum, consequuntur, libero minima obcaecati aliquam nobis repellat voluptas eius nam doloremque. Sit earum consequatur dicta delectus alias repellat veniam iusto, nemo voluptas dolor explicabo! Corrupti ad aspernatur quos a. Labore nam repellendus quisquam accusamus non harum. At necessitatibus hic molestias iure officia? In necessitatibus quidem quasi, itaque, earum nulla aliquid suscipit laboriosam dolorum voluptatibus cumque, eius soluta dolorem quisquam sequi voluptas facere molestias aliquam consequuntur ad nemo eaque? Suscipit perspiciatis aspernatur deserunt distinctio perferendis. Eveniet neque ratione quaerat debitis libero fuga, reiciendis molestias, atque a soluta quibusdam voluptatem dolores.',
      akapit3: 'In porro aut omnis, consectetur, atque dolorem rem, voluptates illum quis tempore veniam necessitatibus consequuntur. Ipsa nostrum nobis harum cum. Cupiditate repudiandae cum fugiat sint facilis.',
    },
    comments: []
  },
  {
    id: '2',
    title: 'Best ideas for lazy evening',
    img: '2.jpg',
    minImg: '2_min.jpg',
    medImg: '2_med.jpg',
    hdImg: '2_hd.jpg',
    content: {
      akapit1: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi esse et sunt, illo iure assumenda quaerat eaque dolor facere libero ipsam commodi eius iusto tempore, voluptas soluta laboriosam veniam ab ea a, consequuntur inventore nihil! Magni, mollitia obcaecati officiis voluptatibus illum deleniti ad adipisci nobis blanditiis pariatur suscipit eaque. In eligendi molestias voluptatum fuga beatae suscipit rerum ut temporibus quo, dolores accusantium, similique vitae eos illo earum. Itaque facere, adipisci, culpa beatae repellendus a porro consectetur ipsa nam temporibus officia sit! Animi ratione numquam doloremque voluptas voluptates porro dolor autem nam deserunt vitae in ex vel modi omnis laudantium recusandae, minus maiores aut eligendi reiciendis possimus.',
      akapit2: 'Optio assumenda perspiciatis quasi ullam corporis beatae consectetur vitae cum cumque delectus molestias ratione molestiae voluptatum, consequuntur, libero minima obcaecati aliquam nobis repellat voluptas eius nam doloremque. Sit earum consequatur dicta delectus alias repellat veniam iusto, nemo voluptas dolor explicabo! Corrupti ad aspernatur quos a. Labore nam repellendus quisquam accusamus non harum. At necessitatibus hic molestias iure officia? In necessitatibus quidem quasi, itaque, earum nulla aliquid suscipit laboriosam dolorum voluptatibus cumque, eius soluta dolorem quisquam sequi voluptas facere molestias aliquam consequuntur ad nemo eaque? Suscipit perspiciatis aspernatur deserunt distinctio perferendis. Eveniet neque ratione quaerat debitis libero fuga, reiciendis molestias, atque a soluta quibusdam voluptatem dolores.',
      akapit3: 'In porro aut omnis, consectetur, atque dolorem rem, voluptates illum quis tempore veniam necessitatibus consequuntur. Ipsa nostrum nobis harum cum. Cupiditate repudiandae cum fugiat sint facilis.',
    },
    comments: []
  },
  {
    id: '3',
    title: 'How to prepare for a first recruit meeting',
    img: '3.jpg',
    minImg: '3_min.jpg',
    medImg: '3_med.jpg',
    hdImg: '3_hd.jpg',
    content: {
      akapit1: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi esse et sunt, illo iure assumenda quaerat eaque dolor facere libero ipsam commodi eius iusto tempore, voluptas soluta laboriosam veniam ab ea a, consequuntur inventore nihil! Magni, mollitia obcaecati officiis voluptatibus illum deleniti ad adipisci nobis blanditiis pariatur suscipit eaque. In eligendi molestias voluptatum fuga beatae suscipit rerum ut temporibus quo, dolores accusantium, similique vitae eos illo earum. Itaque facere, adipisci, culpa beatae repellendus a porro consectetur ipsa nam temporibus officia sit! Animi ratione numquam doloremque voluptas voluptates porro dolor autem nam deserunt vitae in ex vel modi omnis laudantium recusandae, minus maiores aut eligendi reiciendis possimus.',
      akapit2: 'Optio assumenda perspiciatis quasi ullam corporis beatae consectetur vitae cum cumque delectus molestias ratione molestiae voluptatum, consequuntur, libero minima obcaecati aliquam nobis repellat voluptas eius nam doloremque. Sit earum consequatur dicta delectus alias repellat veniam iusto, nemo voluptas dolor explicabo! Corrupti ad aspernatur quos a. Labore nam repellendus quisquam accusamus non harum. At necessitatibus hic molestias iure officia? In necessitatibus quidem quasi, itaque, earum nulla aliquid suscipit laboriosam dolorum voluptatibus cumque, eius soluta dolorem quisquam sequi voluptas facere molestias aliquam consequuntur ad nemo eaque? Suscipit perspiciatis aspernatur deserunt distinctio perferendis. Eveniet neque ratione quaerat debitis libero fuga, reiciendis molestias, atque a soluta quibusdam voluptatem dolores.',
      akapit3: 'In porro aut omnis, consectetur, atque dolorem rem, voluptates illum quis tempore veniam necessitatibus consequuntur. Ipsa nostrum nobis harum cum. Cupiditate repudiandae cum fugiat sint facilis.',
    },
    comments: []
  },
  {
    id: '4',
    title: '4 ways to change the way you think',
    img: '4.jpg',
    minImg: '4_min.jpg',
    medImg: '4_med.jpg',
    hdImg: '4_hd.jpg',
    content: {
      akapit1: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi esse et sunt, illo iure assumenda quaerat eaque dolor facere libero ipsam commodi eius iusto tempore, voluptas soluta laboriosam veniam ab ea a, consequuntur inventore nihil! Magni, mollitia obcaecati officiis voluptatibus illum deleniti ad adipisci nobis blanditiis pariatur suscipit eaque. In eligendi molestias voluptatum fuga beatae suscipit rerum ut temporibus quo, dolores accusantium, similique vitae eos illo earum. Itaque facere, adipisci, culpa beatae repellendus a porro consectetur ipsa nam temporibus officia sit! Animi ratione numquam doloremque voluptas voluptates porro dolor autem nam deserunt vitae in ex vel modi omnis laudantium recusandae, minus maiores aut eligendi reiciendis possimus.',
      akapit2: 'Optio assumenda perspiciatis quasi ullam corporis beatae consectetur vitae cum cumque delectus molestias ratione molestiae voluptatum, consequuntur, libero minima obcaecati aliquam nobis repellat voluptas eius nam doloremque. Sit earum consequatur dicta delectus alias repellat veniam iusto, nemo voluptas dolor explicabo! Corrupti ad aspernatur quos a. Labore nam repellendus quisquam accusamus non harum. At necessitatibus hic molestias iure officia? In necessitatibus quidem quasi, itaque, earum nulla aliquid suscipit laboriosam dolorum voluptatibus cumque, eius soluta dolorem quisquam sequi voluptas facere molestias aliquam consequuntur ad nemo eaque? Suscipit perspiciatis aspernatur deserunt distinctio perferendis. Eveniet neque ratione quaerat debitis libero fuga, reiciendis molestias, atque a soluta quibusdam voluptatem dolores.',
      akapit3: 'In porro aut omnis, consectetur, atque dolorem rem, voluptates illum quis tempore veniam necessitatibus consequuntur. Ipsa nostrum nobis harum cum. Cupiditate repudiandae cum fugiat sint facilis.',
    },
    comments: []
  },
  {
    id: '5',
    title: 'You never know who is on the other side',
    img: '5.jpg',
    minImg: '5_min.jpg',
    medImg: '5_med.jpg',
    hdImg: '5_hd.jpg',
    content: {
      akapit1: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi esse et sunt, illo iure assumenda quaerat eaque dolor facere libero ipsam commodi eius iusto tempore, voluptas soluta laboriosam veniam ab ea a, consequuntur inventore nihil! Magni, mollitia obcaecati officiis voluptatibus illum deleniti ad adipisci nobis blanditiis pariatur suscipit eaque. In eligendi molestias voluptatum fuga beatae suscipit rerum ut temporibus quo, dolores accusantium, similique vitae eos illo earum. Itaque facere, adipisci, culpa beatae repellendus a porro consectetur ipsa nam temporibus officia sit! Animi ratione numquam doloremque voluptas voluptates porro dolor autem nam deserunt vitae in ex vel modi omnis laudantium recusandae, minus maiores aut eligendi reiciendis possimus.',
      akapit2: 'Optio assumenda perspiciatis quasi ullam corporis beatae consectetur vitae cum cumque delectus molestias ratione molestiae voluptatum, consequuntur, libero minima obcaecati aliquam nobis repellat voluptas eius nam doloremque. Sit earum consequatur dicta delectus alias repellat veniam iusto, nemo voluptas dolor explicabo! Corrupti ad aspernatur quos a. Labore nam repellendus quisquam accusamus non harum. At necessitatibus hic molestias iure officia? In necessitatibus quidem quasi, itaque, earum nulla aliquid suscipit laboriosam dolorum voluptatibus cumque, eius soluta dolorem quisquam sequi voluptas facere molestias aliquam consequuntur ad nemo eaque? Suscipit perspiciatis aspernatur deserunt distinctio perferendis. Eveniet neque ratione quaerat debitis libero fuga, reiciendis molestias, atque a soluta quibusdam voluptatem dolores.',
      akapit3: 'In porro aut omnis, consectetur, atque dolorem rem, voluptates illum quis tempore veniam necessitatibus consequuntur. Ipsa nostrum nobis harum cum. Cupiditate repudiandae cum fugiat sint facilis.',
    },
    comments: []
  },
  {
    id: '6',
    title: 'Mysterious Places You should visit next summer',
    img: '6.jpg',
    minImg: '6_min.jpg',
    medImg: '6_med.jpg',
    hdImg: '6_hd.jpg',
    content: {
      akapit1: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi esse et sunt, illo iure assumenda quaerat eaque dolor facere libero ipsam commodi eius iusto tempore, voluptas soluta laboriosam veniam ab ea a, consequuntur inventore nihil! Magni, mollitia obcaecati officiis voluptatibus illum deleniti ad adipisci nobis blanditiis pariatur suscipit eaque. In eligendi molestias voluptatum fuga beatae suscipit rerum ut temporibus quo, dolores accusantium, similique vitae eos illo earum. Itaque facere, adipisci, culpa beatae repellendus a porro consectetur ipsa nam temporibus officia sit! Animi ratione numquam doloremque voluptas voluptates porro dolor autem nam deserunt vitae in ex vel modi omnis laudantium recusandae, minus maiores aut eligendi reiciendis possimus.',
      akapit2: 'Optio assumenda perspiciatis quasi ullam corporis beatae consectetur vitae cum cumque delectus molestias ratione molestiae voluptatum, consequuntur, libero minima obcaecati aliquam nobis repellat voluptas eius nam doloremque. Sit earum consequatur dicta delectus alias repellat veniam iusto, nemo voluptas dolor explicabo! Corrupti ad aspernatur quos a. Labore nam repellendus quisquam accusamus non harum. At necessitatibus hic molestias iure officia? In necessitatibus quidem quasi, itaque, earum nulla aliquid suscipit laboriosam dolorum voluptatibus cumque, eius soluta dolorem quisquam sequi voluptas facere molestias aliquam consequuntur ad nemo eaque? Suscipit perspiciatis aspernatur deserunt distinctio perferendis. Eveniet neque ratione quaerat debitis libero fuga, reiciendis molestias, atque a soluta quibusdam voluptatem dolores.',
      akapit3: 'In porro aut omnis, consectetur, atque dolorem rem, voluptates illum quis tempore veniam necessitatibus consequuntur. Ipsa nostrum nobis harum cum. Cupiditate repudiandae cum fugiat sint facilis.',
    },
    comments: [{
      post: '6',
      id: '1',
      name: 'Paweł Graboś',
      role: 'admin',
      content: 'Noo bardzo fajny post omg sztos',
      img: 'https://www.gravatar.com/avatar/6ff77b82c5d1037e052e6b284dc90045.jpg?s=64'
    }]
  },
  {
    id: '7',
    title: 'Interesting Themes for your website',
    img: '7.jpg',
    minImg: '7_min.jpg',
    medImg: '7_med.jpg',
    hdImg: '7_hd.jpg',
    content: {
      akapit1: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi esse et sunt, illo iure assumenda quaerat eaque dolor facere libero ipsam commodi eius iusto tempore, voluptas soluta laboriosam veniam ab ea a, consequuntur inventore nihil! Magni, mollitia obcaecati officiis voluptatibus illum deleniti ad adipisci nobis blanditiis pariatur suscipit eaque. In eligendi molestias voluptatum fuga beatae suscipit rerum ut temporibus quo, dolores accusantium, similique vitae eos illo earum. Itaque facere, adipisci, culpa beatae repellendus a porro consectetur ipsa nam temporibus officia sit! Animi ratione numquam doloremque voluptas voluptates porro dolor autem nam deserunt vitae in ex vel modi omnis laudantium recusandae, minus maiores aut eligendi reiciendis possimus.',
      akapit2: 'Optio assumenda perspiciatis quasi ullam corporis beatae consectetur vitae cum cumque delectus molestias ratione molestiae voluptatum, consequuntur, libero minima obcaecati aliquam nobis repellat voluptas eius nam doloremque. Sit earum consequatur dicta delectus alias repellat veniam iusto, nemo voluptas dolor explicabo! Corrupti ad aspernatur quos a. Labore nam repellendus quisquam accusamus non harum. At necessitatibus hic molestias iure officia? In necessitatibus quidem quasi, itaque, earum nulla aliquid suscipit laboriosam dolorum voluptatibus cumque, eius soluta dolorem quisquam sequi voluptas facere molestias aliquam consequuntur ad nemo eaque? Suscipit perspiciatis aspernatur deserunt distinctio perferendis. Eveniet neque ratione quaerat debitis libero fuga, reiciendis molestias, atque a soluta quibusdam voluptatem dolores.',
      akapit3: 'In porro aut omnis, consectetur, atque dolorem rem, voluptates illum quis tempore veniam necessitatibus consequuntur. Ipsa nostrum nobis harum cum. Cupiditate repudiandae cum fugiat sint facilis.',
    },
    comments: [{
      post: '7',
      id: '1',
      name: 'Paweł Graboś',
      role: 'admin',
      content: 'Noo bardzo fajny post omg sztos',
      img: 'https://www.gravatar.com/avatar/6ff77b82c5d1037e052e6b284dc90045.jpg?s=64'
    }]
  }
];
const postsKey = 'postsArray';
let postsArray: Array<Post>;
if(!JSON.parse(localStorage.getItem(postsKey)))
  localStorage.setItem(postsKey, JSON.stringify(posts));
  postsArray = JSON.parse(localStorage.getItem(postsKey));

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class PostService {

  
  time = new Observable<string>(observer => {
    setInterval(() => {
      observer.next(new Date().toString());
    }
      , 1000);
  });

  constructor(
    private router: Router,
    private accountService: AccountService
  ) {
      //let postsArray = JSON.parse(localStorage.getItem(postsKey)) || [];
  }

  getPost(id: string): Post {
    let postNum = parseInt(this.router.url[this.router.url.length-1]);
    return postsArray.find(x => x.id == postNum.toString());
  }
  getPosts(pageId?): Array<Post> {
    let tempArray = [];
    if(postsArray.length >= 3*pageId) {
      tempArray.push(postsArray[postsArray.length-(3*pageId)+2]);
      tempArray.push(postsArray[postsArray.length-(3*pageId)+1]);
      tempArray.push(postsArray[postsArray.length-(3*pageId)]);
    }
    else {
      tempArray.push(postsArray[postsArray.length-(3*pageId)+4]);
      tempArray.push(postsArray[postsArray.length-(3*pageId)+3]);
      tempArray.push(postsArray[postsArray.length-(3*pageId)+2]);
    }
    return tempArray;
  }
  getLastPageNumber() {
    return Math.ceil(postsArray.length/3);
  }
  getPostsAmount(): number {
    return postsArray.length;
  }
  getComments(): Array<Comment> {
    let postNum = parseInt(this.router.url[this.router.url.length-1]);
    return postsArray.find(x => x.id == postNum.toString()).comments;
  }
  getCommentsAmount(): number {
    let postNum = parseInt(this.router.url[this.router.url.length-1]);
    return postsArray.find(x => x.id == postNum.toString()).comments.length;
  }
  savePost(updatedPost: Post): void {
    let postNum = parseInt(this.router.url[this.router.url.length-1]);
    postsArray[postNum] = updatedPost;
    localStorage.setItem(postsKey, JSON.stringify(postsArray));
  }
  deletePost(deletedPost: Post): void {
    let postNum = parseInt(this.router.url[this.router.url.length-1]);
    postsArray = postsArray.filter(e => +e.id !== postNum);
    localStorage.setItem(postsKey, JSON.stringify(postsArray));
  }
  addComment(comment: string): void {
    let postNum = postsArray.length - parseInt(this.router.url[this.router.url.length-1]);
    postsArray[postNum]
      .comments.push({
        post: postNum.toString(),
        id: this.getComments().length.toString(),
        name: `${this.accountService.userSubjectValue.firstName} ${this.accountService.userSubjectValue.lastName}`,
        role: 'guest',
        content: comment,
        img: '../../assets/img/guest-icon.jpg'
      });
    localStorage.setItem(postsKey, JSON.stringify(postsArray));
    //console.log(posts);
  }
}

//const postServiceFactory = () => new PostService();

// export const postServiceProvider = Object.freeze({
//   provide: PostService,
//   useFactory: postServiceFactory
// });

export const postServiceProvider = {
   provide: PostService,
   useClass: PostService
};