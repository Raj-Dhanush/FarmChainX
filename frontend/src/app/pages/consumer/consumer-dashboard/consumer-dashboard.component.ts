import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Purchase {
  name: string;
  purchaseDate: string;
  type: string;
  status: string;
}

interface ChartData {
  monthly: { month: string; height: number; value: number }[];
  categories: { name: string; value: number; color: string }[];
}

@Component({
  selector: 'app-consumer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './consumer-dashboard.component.html',
})
export class ConsumerDashboardComponent implements OnInit {
  userProfile = {
    name: 'Subhash Kumawat',
    memberSince: 'Jan 2024',
    location: 'Rajasthan, India',
  };

  totalProducts = 120;
  verifiedProducts = 95;
  traceabilityChecks = 85;
  pendingFeedback = 10;

  // Horizontal bar chart colors
  barColors = ['#34D399', '#3B82F6', '#F59E0B', '#8B5CF6', '#F97316', '#10B981'];

  chartData: ChartData = {
    monthly: [
      { month: 'Jul', height: 45, value: 45 },
      { month: 'Aug', height: 60, value: 60 },
      { month: 'Sep', height: 55, value: 55 },
      { month: 'Oct', height: 75, value: 75 },
      { month: 'Nov', height: 65, value: 65 },
      { month: 'Dec', height: 90, value: 90 },
    ],
    categories: [
      { name: 'Vegetables', value: 40, color: '#34D399' },
      { name: 'Fruits', value: 25, color: '#3B82F6' },
      { name: 'Dairy', value: 15, color: '#F59E0B' },
      { name: 'Grains', value: 20, color: '#8B5CF6' },
    ],
  };

  purchaseHistory: Purchase[] = [
    { name: 'Organic Tomato', purchaseDate: '2025-12-01', type: 'Vegetable', status: 'Verified' },
    { name: 'Apple', purchaseDate: '2025-12-02', type: 'Fruit', status: 'Pending' },
    { name: 'Milk', purchaseDate: '2025-12-03', type: 'Dairy', status: 'Verified' },
    { name: 'Wheat', purchaseDate: '2025-12-04', type: 'Grains', status: 'Verified' },
  ];

  unreadCount = 3;

  ngOnInit(): void {}

  getPieSegment(c: { value: number }): string {
    const total = this.chartData.categories.reduce((sum, cat) => sum + cat.value, 0);
    const percentage = (c.value / total) * 100;
    return `${percentage} 100`;
  }

  getPieOffset(index: number): number {
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += parseFloat(this.getPieSegment(this.chartData.categories[i]));
    }
    return offset;
  }
}