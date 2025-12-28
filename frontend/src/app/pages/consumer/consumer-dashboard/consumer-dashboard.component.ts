import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { CartService } from '../../../services/cart.service';
import { ProductService } from '../../../services/product.service';
import { AuthService } from '../../../services/auth.service';
import { CartSidebarComponent } from '../cart-sidebar/cart-sidebar.component';

Chart.register(...registerables);

@Component({
  selector: 'app-consumer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, CartSidebarComponent], // DatePipe is standalone compatible or used in template implicitly if imported in module/standalone
  templateUrl: './consumer-dashboard.component.html',
})
export class ConsumerDashboardComponent implements AfterViewInit, OnInit {
  @ViewChild('spendChart') spendChartRef!: ElementRef;

  userProfile = {
    name: 'Consumer',
    memberSince: 'Jan 2024',
    location: 'India',
    ecoPoints: 0 // Will correlate with purchases
  };

  stats = {
    totalScans: 0,
    verifiedProducts: 0,
    carbonOffset: '0kg',
    localSupport: '₹0'
  };

  recentScans: any[] = []; // Will be populated from history

  products = signal<any[]>([]);
  isCartOpen = signal(false);

  constructor(
    public cartService: CartService,
    private productService: ProductService,
    private authService: AuthService
  ) {
    this.userProfile.name = this.authService.getName() || 'Consumer';
  }

  ngOnInit() {
    this.loadProducts();
    this.loadHistoryAndStats();
  }

  ngAfterViewInit() {
    // Chart init is now called after data load or with empty data initially?
    // We'll init with empty and update later, or wait.
    // However, canvas needs to exist.
    if (this.spendChartRef) {
      // We will update the chart when data is available
    }
  }

  loadProducts() {
    this.productService.getMarketProducts().subscribe({
      next: (data) => {
        this.products.set(data);
      },
      error: (err) => console.error('Failed to load products', err)
    });
  }

  loadHistoryAndStats() {
    this.productService.getConsumerHistory().subscribe({
      next: (history) => {
        this.processHistory(history);
      },
      error: (err) => console.error('Failed to load history', err)
    });
  }

  processHistory(history: any[]) {
    // 1. Stats
    this.stats.totalScans = history.length;
    this.stats.verifiedProducts = history.length;

    const totalSpent = history.reduce((acc, order) => acc + (order.total || 0), 0);
    this.stats.localSupport = `₹${totalSpent.toLocaleString()}`;

    // Mock Carbon Offset: 0.5kg per product
    this.stats.carbonOffset = `${(history.length * 0.5).toFixed(1)}kg`;

    // Eco Points: 10 points per purchase
    this.userProfile.ecoPoints = history.length * 10;

    // 2. Recent Scans (Take top 5)
    this.recentScans = history.slice(0, 5).map(order => ({
      id: order.id,
      product: order.items && order.items.length > 0 ? order.items[0].name : 'Unknown Product',
      date: new Date(order.date).toLocaleDateString(), // simplified
      status: order.status,
      // For detailed data usage
      original: order
    }));

    // 3. Chart Data
    this.updateChart(history);
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    this.isCartOpen.set(true);
  }

  updateChart(history: any[]) {
    if (!this.spendChartRef) return;

    // Aggregate by category (crop name for now)
    const categoryMap: { [key: string]: number } = {};
    history.forEach(order => {
      const name = order.items && order.items.length > 0 ? order.items[0].name : 'Others';
      categoryMap[name] = (categoryMap[name] || 0) + 1;
    });

    const labels = Object.keys(categoryMap);
    const data = Object.values(categoryMap);

    // Colors
    const colors = [
      '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6', '#EC4899'
    ];

    const ctx = this.spendChartRef.nativeElement.getContext('2d');

    // If chart instance exists, destroy it maybe? 
    // For simplicity, we create new one. Chart.js might complain if canvas is reused without destroy.
    // Let's assume onInit/AfterViewInit overlap is avoided or we just draw once.
    // Ideally store chart instance.

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels.length ? labels : ['No Data'],
        datasets: [{
          data: data.length ? data : [1],
          backgroundColor: data.length ? colors.slice(0, data.length) : ['#E5E7EB'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        cutout: '75%',
        plugins: {
          legend: { position: 'right' }
        }
      }
    });
  }

  getStatusColor(status: string): string {
    return status === 'Delivered' ? 'text-emerald-600 bg-emerald-50' :
      status === 'Processing' ? 'text-blue-600 bg-blue-50' :
        'text-gray-600 bg-gray-50';
  }
}
