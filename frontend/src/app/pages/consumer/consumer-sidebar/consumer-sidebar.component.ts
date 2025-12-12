import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-consumer-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './consumer-sidebar.component.html',
  // styleUrls: ['./consumer-sidebar.component.scss'] // optional
})
export class ConsumerSidebarComponent {
  @Input() currentView: string | null = null;
  @Input() unreadCount: number = 0;
}
