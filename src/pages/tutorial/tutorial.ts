import { Component } from '@angular/core';

import { MenuController, NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../tabs/tabs';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


export interface Slide {
  title: string;
  description: string;
  image: string;
  input: string;
  userInput: string;
}

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  username: string;

  constructor(public navCtrl: NavController, public menu: MenuController, public storage: Storage, public http: Http) {
    this.slides = [
      {
        title: 'Welcome to <b>ICA</b>',
        description: 'The <b>Ionic Conference App</b> is a practical preview of the Ionic Framework in action, and a demonstration of proper code use.',
        image: 'assets/img/ica-slidebox-img-1.png',
        input: 'Username',
        userInput: "",
      },
      {
        title: 'What is Ionic?',
        description: '<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.',
        image: 'assets/img/ica-slidebox-img-2.png',
        input: 'Password',
        userInput: "",
      },
      {
        title: 'What is Ionic Platform?',
        description: 'The <b>Ionic Platform</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.',
        image: 'assets/img/ica-slidebox-img-3.png',
        input: 'Interests',
        userInput: "",
      }
    ];
  }

  startApp() {
    this.navCtrl.push(TabsPage);
    this.storage.set('hasSeenTutorial', 'true');
   
    // var link = 'proxy/hmad/post.php';
    var link = 'https://klecks.info/hmad/post.php';
        var data = ''+this.slides[0].userInput+', '+this.slides[2].userInput;        
        this.http.post(link, data)
        .subscribe(data => {
           console.log("POST RESULT:",data);
        }, error => {
           console.log("POST FAILD");
        });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd;
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
