import { Injectable } from "@angular/core";
import { FaceSnap } from "../models/face-snap";
import { SnapType } from "../models/snap-type.type";
import { HttpClient } from "@angular/common/http";
import { map, Observable, switchMap, tap } from "rxjs";

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

    snapFaceSnapById(faceSnapId: number, snapType: SnapType): Observable<FaceSnap> {
        return this.getFaceSnapById(faceSnapId).pipe(
            map(faceSnap => ({
                ...faceSnap,
                snaps: faceSnap.snaps + (snapType === 'snap' ? 1 : -1)
            })),
            switchMap(updatedFaceSnap => this.http.put<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`, updatedFaceSnap))
        );
    }

    private isIdUnique(id: number): boolean {
        return !this.faceSnaps.some(faceSnap => faceSnap.id === id);
    }

    private getMaxId(): Observable<number> {
        return this.getAllFaceSnapsFromServer().pipe(
            map(faceSnaps => {
                if (faceSnaps.length === 0) return 0;
                return Math.max(...faceSnaps.map(faceSnap => faceSnap.id));
            })
        );
    }

    addFaceSnap(formValue: { title: string, description: string, imageUrl: string, location?: string }): Observable<FaceSnap> {
        return this.getMaxId().pipe(
            map(maxId => {
                const newFaceSnap = new FaceSnap(
                    formValue.title,
                    formValue.description,
                    new Date(),
                    0,
                    formValue.imageUrl
                );
                newFaceSnap.id = maxId + 1;
                
                if (formValue.location) {
                    newFaceSnap.withLocation(formValue.location);
                }
                return newFaceSnap;
            }),
            switchMap(newFaceSnap => 
                this.http.post<FaceSnap>('http://localhost:3000/facesnaps', newFaceSnap)
            )
        );
    }
}