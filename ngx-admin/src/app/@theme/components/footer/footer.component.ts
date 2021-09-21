import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
    Tasshilat Services © - Copyright 2020-2021
    </span>
    <div class="socials">
      <a  target="_blank" class="ion ion-social-github"></a>
      <a  target="_blank" class="ion ion-social-facebook"></a>
      <a  target="_blank" class="ion ion-social-twitter"></a>
      <a  target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
