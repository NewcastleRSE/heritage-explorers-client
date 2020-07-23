import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {
  currentSection = 'section1';

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

openImage() {
  const url = this.router.serializeUrl(
    this.router.createUrlTree(['/board'])
  );

  window.open(url, '_blank');
}

playGame() {
    this.router.navigate(['welcome']);
}

  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }

  scrollTo(section) {
    document.querySelector('#' + section)
      .scrollIntoView();
  }

}
