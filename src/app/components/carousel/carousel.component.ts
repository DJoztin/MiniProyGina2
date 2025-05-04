// src/app/carousel/carousel.component.ts
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})

export class CarouselComponent {
  images = [
    { url: '/img/caroussel1.jpg' },
    { url: '/img/caroussel2.jpg' },
    { url: '/img/caroussel3.jpg' }
  ];

  currentIndex: number = 1;
  changeImgInterval!: any;

  get backgroundImage() {
    return `url(${this.images[this.currentIndex].url})`;
  }

  prev() {
    this.currentIndex = this.currentIndex - 1;
    if(this.currentIndex < 0){
      this.currentIndex = 2;
    }
    this.resetInterval();
  }

  next() {
    this.currentIndex = this.currentIndex + 1;
    if(this.currentIndex > 2){
      this.currentIndex = 0;
    }
    this.resetInterval();
  }

  ngOnInit() {
    this.changeImgInterval=setInterval(() => {
      this.next();
    }, 5000);
  }

  resetInterval() {
    clearInterval(this.changeImgInterval);
    this.changeImgInterval = setInterval(() => {
      this.next();
    }, 5000);
  }
}
