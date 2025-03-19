import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaceSnapComponent } from './face-snap/face-snap.component';
import { FaceSnap } from './models/face-snap';

@Component({
  selector: 'app-root',
  imports: [FaceSnapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  mySnap!: FaceSnap;
  myOtherSnap!: FaceSnap;

  ngOnInit(): void {
    this.mySnap = new FaceSnap(
      'Archibald', 
      'Mon meilleur ami depuis tout petit !',
      new Date(),
      0, 
      'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg'
      );
      this.myOtherSnap = new FaceSnap(
        'Tree Rock Moutain', 
        'Un beau paysage',
        new Date(),
        0, 
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Mount_Everest_from_Druk_Air_Plane_%2824604783380%29.jpg/1280px-Mount_Everest_from_Druk_Air_Plane_%2824604783380%29.jpg');
  }
}
