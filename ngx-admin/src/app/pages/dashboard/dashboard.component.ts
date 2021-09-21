import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@nebular/auth/auth.service';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
  link: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit,OnDestroy {

  private alive = true;

  solarValue: number;
  lightCard: CardSettings = {
    title: 'Users',
    iconClass: 'nb-person',
    type: 'primary',
    link: '/pages/tables/smart-table'
  };
  rollerShadesCard: CardSettings = {
    title: 'Bills',
    iconClass: 'nb-compose',
    type: 'success',
    link: '/pages/tables/smart-table4'
  };
  wirelessAudioCard: CardSettings = {
    title: 'Transfers',
    iconClass: 'nb-arrow-retweet',
    type: 'info',
    link: '/pages/tables/smart-table5'
  };
  clientCard: CardSettings = {
    title: 'Refill',
    iconClass: 'nb-tables',
    type: 'warning',
    link: '/pages/tables/smart-table3'
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.clientCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.lightCard,
        type: 'warning',
      },
      {
        ...this.rollerShadesCard,
        type: 'primary',
      },
      {
        ...this.wirelessAudioCard,
        type: 'danger',
      },
      {
        ...this.clientCard,
        type: 'info',
      },

    ],
    dark: this.commonStatusCardsSet,
  };

  constructor(private themeService: NbThemeService,
              private solarService: SolarData,
              private authService: AuthService,
              private router: Router) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
    });

    

    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });
  }
  ngOnInit(){
    this.authenticate("bensitel-h", "admin");
  }

  ngOnDestroy() {
    this.alive = false;
  }

  authenticate(username: string, password: string) {
    this.authService.login(username, password).subscribe(
      resData => {
        console.log("[authComp]:sucess", resData);
      },
      errRes => {
        console.log(errRes);
      }
    );
  }

  onCardClick(link: string)
  {
    this.router.navigateByUrl(link);
  }

}
