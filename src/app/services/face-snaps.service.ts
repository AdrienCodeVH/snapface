import { Injectable } from "@angular/core";
import { FaceSnap } from "../models/face-snap";
import { SnapType } from "../models/snap-type.type";
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FaceSnapsService {

    private faceSnaps: FaceSnap[] = [];

    constructor(private http: HttpClient) {}

    getAllFaceSnapsFromServer(): Observable<FaceSnap[]> {
        return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps').pipe(
            tap(data => {
                console.log('Données reçues du serveur:', data);
                this.faceSnaps = data;
            })
        );
    }

    getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
        return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`);
    }

    snapFaceSnapById(faceSnapId: string, snapType: SnapType): void {
        const faceSnap = this.faceSnaps.find(fs => fs.id === faceSnapId);
        if (!faceSnap) {
            throw new Error('FaceSnap not found!');
        }
        faceSnap.snap(snapType);
    }

    private isIdUnique(id: string): boolean {
        return !this.faceSnaps.some(faceSnap => faceSnap.id === id);
    }

    addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string }): void {
        let faceSnap: FaceSnap | undefined;
        let isUnique = false;
        
        while (!isUnique) {
            faceSnap = new FaceSnap(
                formValue.title,
                formValue.description,
                new Date(),
                0,
                formValue.imageUrl
            );
            isUnique = this.isIdUnique(faceSnap.id);
        }

        if (!faceSnap) {
            throw new Error('Impossible de créer un FaceSnap avec un ID unique');
        }

        if (formValue.location) {
            faceSnap.withLocation(formValue.location);
        }
        this.faceSnaps.push(faceSnap);
    }
}