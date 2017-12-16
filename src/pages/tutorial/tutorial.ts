import { Component, ViewChild } from '@angular/core';

import { MenuController, NavController, Slides } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { TabsPage } from '../tabs-page/tabs-page';

import { Http } from '@angular/http';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})

export class TutorialPage {
  showSkip = true;
  username: string;
  password: string;
  interests: string;

	@ViewChild('slides') slides: Slides;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public storage: Storage,
    private http: Http
  ) { }

  startApp() {
    console.log("username: "+this.username)
    console.log("password: "+this.password)
    console.log("interests: "+this.interests)

    var link = 'proxy/hmad/post.php';
    var data = ''+this.username+', '+this.password+', '+this.interests;        
    // this.http.post(link, data)
    // .subscribe(data => {
    //   console.log("POST RESULT:",data);
    // }, error => {
    //   console.log("POST FAILD");
    // });

    this.http.post(link, data)
            .subscribe(data => {
                console.log("data: "+ data)
            }, error => {
                console.log(JSON.stringify(error.json()));
            });



    this.navCtrl.push(TabsPage).then(() => {
      this.storage.set('hasSeenTutorial', 'true');
    })
  }

  onSlideChangeStart(slider: Slides) {
    this.showSkip = !slider.isEnd();
  }

  ionViewWillEnter() {
    this.slides.update();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
