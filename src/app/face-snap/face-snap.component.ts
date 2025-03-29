import { Component, Input, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { DatePipe, NgClass, NgStyle, TitleCasePipe } from '@angular/common';
import { FaceSnapsService } from '../services/face-snaps.service';

@Component({
  selector: 'app-face-snap',
  standalone: true,
  imports: [NgStyle, NgClass, DatePipe, TitleCasePipe],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss'
})
export class FaceSnapComponent implements OnInit{
  @Input() faceSnap!: FaceSnap;

  snaped!: boolean;
  snapButtonText!: string;

constructor(private faceSnapsService: FaceSnapsService) {}

  ngOnInit(): void {
    this.snaped = false;
    this.snapButtonText = 'Oh Snap!'; 
  }

  onAddSnap(): void {
    if (this.snaped) {
      this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'unsnap');
    } else {
      this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'snap');
    }
    this.snaped = !this.snaped;
    this.snapButtonText = this.snaped ? 'Oops, unSnap!' : 'Oh Snap!';
  }
}
