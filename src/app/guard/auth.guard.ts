import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { GlobalService } from "../services/global.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private gbs: GlobalService, private route: Router) { }
    canActivate() {
        if (this.gbs.loggedIn())
            return true;
        this.route.navigate(['/login']);
        return false;
    }

}

