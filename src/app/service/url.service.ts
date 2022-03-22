import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class UrlService {

    private path: string = "";

    constructor(private router: Router, private location: Location) { }

    public setPath() {
        this.path = this.location.path();
        return this.path;
    }

    public getPath() {
        return this.path;
    }


}