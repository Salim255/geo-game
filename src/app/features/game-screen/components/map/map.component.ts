import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import * as L from 'leaflet';
import { GpsService } from '../../services/gps.service';
import { GameScreenService } from '../../services/game-screen.service';
import { Subscription } from 'rxjs';
import { GameDataService } from '../../services/game-data.service';
import { CurrentActionState, CurrentTargetState, GameConfig, GameTarget } from '../../interfaces/game.interface';
import { ChallengeService } from '../../services/challenge.service';
import { CurrentTargetService } from '../../services/currentTarget.service';
import { NextTargetService, NextTargetState } from '../../services/next-target-service';
import { ActionService } from '../../services/action.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  standalone: false
})
export class MapComponent implements OnInit, OnDestroy {

  private gameDataSubscription!: Subscription;

  // ================= MAP =================
  private map!: L.Map;
  private userMarker!: L.Marker;
  private targetCircle!: L.Circle;

  private isInZone = false;
  private gameData: GameConfig | null = null;
  // ================= GAME INPUT =================
  private target!: GameTarget;
  private targets: Array< GameTarget> = [];

  private currentTargetIndex = 0;

  constructor(
    private actionService: ActionService,
    private nextTargetService: NextTargetService,
    private currentTargetService: CurrentTargetService,
    private challengeService: ChallengeService,
    private dataService: GameDataService,
    private gps: GpsService,
    private game: GameScreenService
  ) {}

  // ================= INIT =================
  ngOnInit() {
    this.subscribeToGameData();
  }

  setGameData(gameData: GameConfig | null){
    this.gameData = gameData;
    this.targets = this.gameData?.targets ?? [];
  }


  private subscribeToGameData(){
    this.gameDataSubscription = this.dataService.getGame$.subscribe(game=> {
      this.setGameData(game);
      if (!this.targets.length) return;

      this.target = this.targets[0]; // IMPORTANT

      this.initMap();
      this.renderTargets();
      this.renderTargetZone();
      this.startTracking();
    })
  }

  // ================= MAP =================
  private initMap() {

    this.map = L.map('map').setView(
      [this.target.location.lat, this.target.location.lng],
      15
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
  }

  // ================= TARGETS =================
  private renderTargets() {
    const icon = this.createTargetIcon();

    this.targets.forEach(t => {
      L.marker([t.location.lat, t.location.lng], { icon })
        .addTo(this.map)
        .bindPopup(`🎯 Target ${t.id}`);
    });
  }

  private renderTargetZone() {
    this.targetCircle = L.circle(
      [this.target.location.lat, this.target.location.lng],
      {
        radius: this.target.location.radius,
        color: 'red',
        fillOpacity: 0.2
      }
    ).addTo(this.map);
  }

  private updateTargetZone() {
    this.targetCircle.setLatLng([this.target.location.lat, this.target.location.lng]);
    this.targetCircle.setRadius(this.target.location.radius);
  }

  // ================= GPS =================
  private startTracking() {

    const userIcon = this.createUserIcon();

    // 🧪 DEV MODE
    this.gps.startFakeTracking(
      50.63061531074475,   // NEW start lat (300m before point 1)
      3.010675532644488,   // NEW start lng
      (pos) => this.handlePosition(pos, userIcon)
    );

    // 📍 PROD MODE

    /* this.gps.startTracking((pos) =>
      this.handlePosition(pos, userIcon)
    ); */

  }

  private handlePosition(pos: GeolocationPosition, icon: L.Icon) {

    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;

    this.updateUserMarker(lat, lng, icon);
    this.checkZone(lat, lng);
  }

  // ================= USER =================
  private updateUserMarker(lat: number, lng: number, icon: L.Icon) {

    if (!this.userMarker) {
      this.userMarker = L.marker([lat, lng], { icon })
        .addTo(this.map)
        .bindPopup('📍 You');
    } else {
      this.userMarker.setLatLng([lat, lng]);
    }

    this.map.panTo([lat, lng]);
  }

  // ================= GAME LOGIC =================
  private checkZone(lat: number, lng: number) {

    const distance = this.gps.getDistance(
      lat,
      lng,
      this.target.location.lat,
      this.target.location.lng
    );

    if (distance < this.target.location.radius && !this.isInZone) {
      this.isInZone = true;
      this.onEnterZone();
    }

    if (distance >= this.target.location.radius && this.isInZone) {
      this.isInZone = false;
    }
  }

  // ================= GAME EVENT =================
  private onEnterZone() {
    //console.log('🎉 TARGET REACHED');
    // 🔥 visual + audio feedback handled in service

    this.game.moveTargetAlongPath([], () => {}, () => {});

    this.animateTarget();
    this.speak("Target reached. Well done!");

    this.goToNextTarget();

    // Set the current target

    //this.challengeService.openQuestionDialog();
  }

  // ================= NEXT TARGET =================
  private goToNextTarget() {



    if (this.currentTargetIndex >= this.targets.length) {
     // console.log('🏁 GAME COMPLETE');
      return;
    }


    // Set
    const nextTarget: NextTargetState = {
      id: this.target.id,
      name: this.target.name,
      reached: true,
      currentActionIndex: 0
    };
    this.nextTargetService.setNextTarget(nextTarget);
    const currentTargeState = new CurrentTargetState();
    currentTargeState.buildFromTarget(this.target);
    this.currentTargetService.setCurrentTargetState(currentTargeState);
    this.currentTargetService.setCurrentTarget(this.target);


    this.updateTargetZone();

    // Update current target
    this.currentTargetIndex++;
    this.target = this.targets[this.currentTargetIndex];
  }

  // ================= VISUAL =================
  private animateTarget() {

    let step = 0;

    const interval = setInterval(() => {

      step++;

      this.targetCircle.setRadius(
        this.target.location.radius + step * 8
      );

      if (step > 6) {
        clearInterval(interval);
        this.targetCircle.setRadius(this.target.location.radius);
      }

    }, 80);
  }

  private speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // or fr-FR
    speechSynthesis.speak(utterance);
  }

  // ================= ICONS =================
  private createUserIcon(): L.Icon {
    return L.icon({
      iconUrl:
        'data:image/svg+xml;charset=UTF-8,' +
        encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
            <circle cx="20" cy="20" r="8" fill="#2b6cff"/>
            <circle cx="20" cy="20" r="14" fill="none" stroke="#2b6cff" stroke-opacity="0.3" stroke-width="6"/>
          </svg>
        `),
      iconSize: [80, 80],
      iconAnchor: [40, 40],
    });
  }

  private createTargetIcon(): L.Icon {
    return L.icon({
      iconUrl:
        'data:image/svg+xml;charset=UTF-8,' +
        encodeURIComponent(`
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
            <circle cx="16" cy="16" r="10" fill="red"/>
          </svg>
        `),
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });
  }

  // ================= CLEANUP =================
  ngOnDestroy() {
    this.gps.stopTracking();
    this.gameDataSubscription?.unsubscribe();
  }
}
