import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [NzCardModule, NzListModule, CommonModule],
})
export class HomeComponent {
  documents = [
    { title: 'School Health Policy', link: '#' },
    { title: 'Emergency Procedures', link: '#' },
  ];

  blogPosts = [
    {
      title: 'Managing Allergies in School',
      summary: 'Tips for parents and staff...',
    },
    {
      title: 'Importance of Vaccinations',
      summary: 'Why vaccinations matter...',
    },
  ];
}
