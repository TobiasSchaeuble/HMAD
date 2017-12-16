import { Component, ViewChild, ElementRef } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';

import { Platform } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';


declare var google: any;


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  map: any

  @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor(public confData: ConferenceData, public platform: Platform, private geolocation: Geolocation) {
  }

  ionViewDidLoad() {



      this.confData.getMap().subscribe((mapData: any) => {
        let mapEle = this.mapElement.nativeElement;

        let map = new google.maps.Map(mapEle, {
          center: mapData.find((d: any) => d.center),
          zoom: 16
        });

        this.map = map

        mapData.forEach((markerData: any) => {
          let infoWindow = new google.maps.InfoWindow({
            content: `<h5>${markerData.name}</h5>`
          });

          let marker = new google.maps.Marker({
            position: markerData,
            map: map,
            title: markerData.name
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        });

        google.maps.event.addListenerOnce(map, 'idle', () => {
          mapEle.classList.add('show-map');
        });

      });

  }

  setCurrentposition(){
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('resp', resp);
      var pos = {
          "lat": resp.coords.latitude,
          "lng": resp.coords.longitude
        };
      new google.maps.Circle({
          strokeColor: '#2980b9',
          strokeOpacity: 0.5,
          strokeWeight: 1,
          fillColor: '#2980b9',
          fillOpacity: 0.35,
          map: this.map,
          center: pos,
          radius: resp.coords.accuracy
        });
      new google.maps.Circle({
          strokeColor: '#2980b9',
          strokeOpacity: 1,
          strokeWeight: 4,
          fillColor: '#2980b9',
          fillOpacity: 0.8,
          map: this.map,
          center: pos,
          radius: 1
        });

      this.map.setCenter(pos)
      
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    
  }
}
