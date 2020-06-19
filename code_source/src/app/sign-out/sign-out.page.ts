import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.page.html',
  styleUrls: ['./sign-out.page.scss'],
})
export class SignOutPage implements OnInit {

  constructor(public afAuth: AngularFireAuth, public router: Router) {

  }

  ionViewWillEnter() {
    this.afAuth.signOut().then(() => {
      this.router.navigateByUrl('/connexion');
    });
  }
  ngOnInit() {
  }

}
