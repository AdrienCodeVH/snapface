import { Component, Input, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { DatePipe, LowerCasePipe, NgClass, NgStyle, TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-face-snap',
  imports: [NgStyle, NgClass, DatePipe, TitleCasePipe],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss'
})
export class FaceSnapComponent implements OnInit{
  @Input() FaceSnap!: FaceSnap;

  snaped!: boolean;
  snapButtonText!: string;


  ngOnInit(): void {
    this.FaceSnap;
    this.snaped = false;
    this.snapButtonText = 'Oh Snap!'; 
  }

  onAddSnap(): void {
    if (this.snaped) {
      this.FaceSnap.removeSnap();
    } else {
      this.FaceSnap.addSnap();
    }
    this.snaped = !this.snaped;
    this.snapButtonText = this.snaped ? 'Oops, unSnap!' : 'Oh Snap!';
  }
}
