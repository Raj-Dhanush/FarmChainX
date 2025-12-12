import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consumer-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consumer-notifications.component.html',
})
export class ConsumerNotificationsComponent {
  notifications = [
    {
      id: 1,
      title: 'Product Verified',
      body: 'Your purchase of Organic Apples is verified.',
      time: '2h ago',
      read: false,
    },
    {
      id: 2,
      title: 'New Feedback Request',
      body: 'Please leave feedback for Honey Jar.',
      time: '1d ago',
      read: false,
    },
    { id: 3, title: 'Promo', body: 'New offers from local farms.', time: '3d ago', read: true },
  ];

  markRead(n: any) {
    n.read = true;
  }

  clearAll() {
    this.notifications = [];
  }
}
