import { Component } from '@angular/core';
import { TokenService } from './service/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private tokenService:TokenService){}

  title = 'TSM.ui';


  checkLogin() {
    return this.tokenService.isValidToken();
  }
}
