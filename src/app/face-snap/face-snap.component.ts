import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-face-snap',
  imports: [],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss'
})
export class FaceSnapComponent implements OnInit{

  title!: string;
  description!: string;
  createdAt!: Date;
  snaps!: number;
  imageUrl!: string;
  snaped!: boolean;
  snapButtonText!: string;


  ngOnInit(): void {
    this.title = 'Archibald';
    this.description = 'Mon meilleur ami depuis tout petit !';
    this.createdAt = new Date();
    this.snaps = 0;
    this.imageUrl = 'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg';
    this.snaped = false;
    this.snapButtonText = 'Oh Snap!'; 
  }

  onAddSnap(): void {
    if (this.snaped) {
      this.snaps--;
    } else {
      this.snaps++;
    }
    this.snaped = !this.snaped;
    this.snapButtonText = this.snaped ? 'Oops, unSnap!' : 'Oh Snap!';
  }
}
