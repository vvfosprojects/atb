import { Component, Input, OnInit } from '@angular/core';
import { UserInterface } from '../../../shared/interface/common/user.interface';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    @Input() currentUser: UserInterface;

    constructor() {
    }

    ngOnInit(): void {
    }

}
