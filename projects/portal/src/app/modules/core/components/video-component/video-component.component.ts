// @ts-ignore
import {Component, OnInit, AfterViewInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild, OnDestroy} from '@angular/core';
import {PlyrComponent} from 'ngx-plyr';
import * as Plyr from 'plyr';

// @ts-ignore
@Component({
  selector: 'app-video-component',
  templateUrl: './video-component.component.html',
  styleUrls: ['./video-component.component.scss'],
})
export class VideoComponentComponent implements OnInit, AfterViewInit, OnChanges  {


  @Output() lastPercentage = new EventEmitter();
  @Output() playStatus = new EventEmitter();
  @Output() onReadyPlayer = new EventEmitter();
  
  // player;
  @Input() playDefault = false;
  @Input() videoId;
  @Input() contentId;
  @Input() categoryId;
  @Input() pocId;
  // videoStyle ( 1 or 2)
  @Input() videoStyle;
  @Input() videoTitle;
  @Input() videoDescription;
  @Input() fullScreen:boolean= true;
  player: Plyr;
  vimeoSources;

  options: Plyr.Options = {
    autopause: true
    
  
  };
  public players: Plyr[];

  constructor() {
  }

  ngOnInit() {
    if(!this.fullScreen){
      this.options.fullscreen={
        enabled: this.fullScreen,
        fallback: true,
        allowAudio: true,
        iosNative : true
      }
    }
    this.vimeoSources = [
      {
        src: this.videoId,
        provider: 'vimeo',
      },
    ];
    // this.vimeoSources  = [
    //   {
    //     src: 'bTqVqk7FSmY',
    //     provider: 'youtube',
    //   },
    // ];
  
  }

  ngAfterViewInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  played(event: Plyr.PlyrEvent) {
  }

  play(): void {
    if (this.playDefault) {
      this.player.play(); // or this.plyr.player.play()
    }
  }


  ready($event: any) {
    this.play();
    this.onReadyPlayer.emit(true);
  }

  progress(event: Plyr.PlyrEvent) {
    const duration = event.detail.plyr.duration;
    const currentSeconds = event.detail.plyr.currentTime;
    const percent = (currentSeconds / duration) * 100;
    this.lastPercentage.emit(percent);
  }

  onPause($event: Plyr.PlyrEvent) {
    this.playStatus.emit(false);
  }

  onPlay($event: Plyr.PlyrEvent) {
    this.playStatus.emit(true);
  }

  initPlayer(event){
    this.player = event;
    // this.onPlayer.emit(true);
  }
  // canPlay(){
  //   this.onReadyPlayer.emit(true);
  // }
 
  
}

