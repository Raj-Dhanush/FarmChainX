import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-consumer-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consumer-history.component.html',
})
export class ConsumerHistoryComponent implements OnInit {
  purchaseHistory = [
    {
      id: 'P-001',
      name: 'Organic Apples',
      date: '2025-04-02',
      status: 'Verified',
      vendor: 'Green Farms',
    },
    { id: 'P-002', name: 'Honey Jar', date: '2025-03-28', status: 'Pending', vendor: 'Sweet Bees' },
    {
      id: 'P-003',
      name: 'Millet Pack',
      date: '2025-03-12',
      status: 'Verified',
      vendor: 'Hill Farm',
    },
  ];

  ngOnInit(): void {
    // fetch from API if needed
  }
}
