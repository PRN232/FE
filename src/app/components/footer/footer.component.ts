import { Component } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzListModule } from 'ng-zorro-antd/list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [NzGridModule, NzListModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {}
