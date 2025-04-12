import { Component, OnInit} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page-component',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit{

  userEmail!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.userEmail);
  }

  onViewFaceSnaps(): void {
    this.router.navigateByUrl('/facesnaps');
  }
}
