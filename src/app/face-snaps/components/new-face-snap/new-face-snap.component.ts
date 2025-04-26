import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FaceSnap } from '../../../core/models/face-snap';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-face-snap',
  imports: [ReactiveFormsModule, DatePipe, CommonModule],
  templateUrl: './new-face-snap.component.html',
  styleUrl: './new-face-snap.component.scss'
})
export class NewFaceSnapComponent implements OnInit {

  snapForm!: FormGroup;
  faceSnapPreview$!: Observable<FaceSnap>;
  urlRegex!: RegExp;

  constructor(
    private formBuilder: FormBuilder,
    private faceSnapsService: FaceSnapsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    this.snapForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      imageUrl: [null, [Validators.required]],
      location: [null]
    }, { updateOn: 'blur' });
    this.faceSnapPreview$ = this.snapForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
        createdAt: new Date(),
        id: 0,
        snaps: 0
      }))
    );
  }

  onSubmitForm(): void {
    this.faceSnapsService.addFaceSnap(this.snapForm.value).subscribe({
      next: () => this.router.navigateByUrl('/facesnaps'),
      error: (error) => console.error('Erreur lors de la création du FaceSnap:', error)
    });
  }

}
