import { Injectable } from "@angular/core";
import { FaceSnap } from "../models/face-snap";
import { SnapType } from "../models/snap-type.type";

@Injectable({
    providedIn: 'root'
})
export class FaceSnapsService {
    private faceSnaps: FaceSnap[] = [ new FaceSnap(
        'Archibald',
        'Mon meilleur ami depuis tout petit !',
        new Date(),
        0, 
        'https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg'
      ),
      new FaceSnap(
        'Tree Rock Moutain',
        'Un beau paysage',
        new Date(),
        200,
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Mount_Everest_from_Druk_Air_Plane_%2824604783380%29.jpg/1280px-Mount_Everest_from_Druk_Air_Plane_%2824604783380%29.jpg',
      ).withLocation('Bhutan')];

    getAllFaceSnaps(): FaceSnap[] {
        return [...this.faceSnaps];
    }

    snapFaceSnapById(faceSnapId: string, snapType: SnapType): void {
        const FaceSnap = this.getFaceSnapById(faceSnapId);
        if (!FaceSnap) {
            throw new Error('FaceSnap not found!');
        }
        FaceSnap.snap(snapType);
    }

    getFaceSnapById(faceSnapId: string): FaceSnap {
        const foundFaceSnap = this.faceSnaps.find(faceSnap => faceSnap.id === faceSnapId);
        if (!foundFaceSnap) {
            throw new Error('FaceSnap not found!');
        }
        return foundFaceSnap;
    }
}