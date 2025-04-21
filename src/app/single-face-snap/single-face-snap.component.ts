import { Component, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { DatePipe, NgStyle, TitleCasePipe, CommonModule } from '@angular/common';
import { FaceSnapsService } from '../services/face-snaps.service';
import { ActivatedRoute } from '@angular/router';
import { RouterLink } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-single-face-snap',
  standalone: true,
  imports: [CommonModule, NgStyle, DatePipe, TitleCasePipe, RouterLink],
  templateUrl: './single-face-snap.component.html',
  styleUrl: './single-face-snap.component.scss'
})
export class SingleFaceSnapComponent implements OnInit {
  faceSnap$!: Observable<FaceSnap>;
  snaped!: boolean;
  snapButtonText!: string;

  constructor(private faceSnapsService: FaceSnapsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.prepareInterface();
    this.getFaceSnap();
  }

  onAddSnap(): void {
   // if (this.snaped) {
    //  this.faceSnapsService.snapFaceSnapById(this.route.snapshot.params['id'], 'unsnap');
    //} else {
      //this.faceSnapsService.snapFaceSnapById(this.route.snapshot.params['id'], 'snap');
    //}
    //this.snaped = !this.snaped;
    //this.snapButtonText = this.snaped ? 'Oops, unSnap!' : 'Oh Snap!';
  }

  private getFaceSnap() {
    const faceSnapId = this.route.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId);
  }

  private prepareInterface() {
    this.snaped = false;
    this.snapButtonText = 'Oh Snap!';
  }
}
