import { SnapType } from "./snap-type.type";

export class FaceSnap {
    location?: string;
    id: number;
    constructor(
        public title: string,
        public description: string,
        public createdAt: Date,
        public snaps: number,
        public imageUrl: string
    ) {
        this.id = Math.random();
    }

    snap(snapType: SnapType): void {
        if (snapType === 'snap') {
            this.snaps++;
        } else {
            this.snaps--;
        }
    }
    
    setLocation(location: string): void {
        this.location = location;
    }

    withLocation(location: string): FaceSnap{
        this.location = location;
        return this;
    }
}

