import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {DoctorService} from '../../../dps/doctor.service';
import {TranslateService} from '../../../cms/translation/translate.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {
  videoId: any = '';
  @Input() mainList;
  @Input() mainListTitle;
  @Input() mainListSubTitle;
  @Input() lang;

  @Output() currentVideoId = new EventEmitter();
  @Output() currentVideoPercentage = new EventEmitter();

  public latestPercentage: any;
  public newVideoId: any;
  public newVideoPercentage: any;
  public changedVideo: boolean;
  public oldVideoPercentage: any;
  public oldVideoId: any;

  constructor(
    public doctorService: DoctorService,
    public translate: TranslateService) {
  }

  ngOnInit() {
  }

  onPercentageChanged($event: any) {
    this.latestPercentage = $event;
    this.currentVideoPercentage.emit($event);
  }

  onPlayChanged($event: any, id: any) {
    if ($event) {
      this.newVideoId = id;
      this.newVideoPercentage = this.latestPercentage;
      this.currentVideoId.emit(id);
      setTimeout(() => {
        if (this.newVideoId && this.oldVideoId && this.newVideoId !== this.oldVideoId) {
          this.changedVideo = true;

          this.doctorService.statisticContent(
            this.oldVideoId,
            this.oldVideoPercentage,
            ['content_watch', 'content_displayed', 'content_click'],
            this.lang,
            undefined).subscribe(() => {
          });
        }
      }, 100);
    } else {
      this.oldVideoId = id;
      this.oldVideoPercentage = this.latestPercentage;
    }

  }
}
