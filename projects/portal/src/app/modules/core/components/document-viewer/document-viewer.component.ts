import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent implements OnInit {
  @Input() pdfLink;
  @Output() lastPercentage = new EventEmitter();
  @Output() pdfLoaded = new EventEmitter();
  @Output() pagesLoaded = new EventEmitter();
  currentPage: any;
  public pdfPages: number;

  constructor() { }

  ngOnInit() {
  }

  onLoadPdf($event) {
    this.pdfPages = $event.pagesCount;
    this.pdfLoaded.emit(true);
  }

  onPageChange($event: number) {
    const percent = ( this.currentPage / this.pdfPages) * 100;
    this.lastPercentage.emit(percent);
  }
  onPagesLoaded($event){
    const percent = ( 1 / this.pdfPages) * 100;
    this.lastPercentage.emit(percent);
    this.pagesLoaded.emit(true);
  }
}
