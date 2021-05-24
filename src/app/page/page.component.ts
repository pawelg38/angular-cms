import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute) {
      this.route.params.subscribe(x => {
        if(x.id == 0 || x.id == undefined) {
          this.router.navigate(['/1']);
        }
      })
  }

  ngOnInit(): void {
    document.body.scrollTop = 0;
  }

}
