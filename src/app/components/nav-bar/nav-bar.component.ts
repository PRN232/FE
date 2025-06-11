import { Component } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterLink } from '@angular/router';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    NzMenuModule,
    NzButtonModule,
    NzDrawerModule,
    NzIconModule,
    NzModalModule,
    RouterLink,
    CommonModule,
    LoginComponent,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  isLoggedIn = false;
  isLoginModalVisible = false;

  openLoginModal(): void {
    this.isLoginModalVisible = true;
  }

  closeLoginModal(): void {
    this.isLoginModalVisible = false;
  }

  handleLogin(): void {
    this.isLoggedIn = true;
    this.closeLoginModal();
  }
}
