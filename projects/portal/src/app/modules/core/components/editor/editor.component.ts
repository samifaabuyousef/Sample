import {Component, OnInit, ViewChild, EventEmitter, Output, Input} from '@angular/core';
import {Subject} from 'rxjs';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';

declare var tinymce: any;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @ViewChild('tinyEditor', {static: true}) public editor;
  @Output() contentChanging = new EventEmitter();
  @Input() public bodyContent = '';
  dialogSelectedImage = new EventEmitter<any>();
  selectedImage;
  dialogOpened = false;
  imageWidth: any = 'unset';
  imageHeight: any = 'unset';
  public editorConfig = {
    height: 500,
    menubar: false,
    paste_data_images: true,
    // link_assume_external_targets: true,
    plugins: [
      ' searchreplace directionality fullscreen  hr link pagebreak nonbreaking anchor lists wordcount textpattern image '
    ],
    toolbar: ' undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify' +
      ' | outdent indent |  numlist bullist | forecolor backcolor removeformat | fullscreen |  link | ltr rtl |  browseImage',
    toolbar_mode: 'wrap',
    imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
    image_title: true,

    anchor_bottom: false,

    setup: editor => {
      this.editor = editor;
      const editorContent = this.bodyContent;

      editor.on('init', function(e) {

        editor.setContent(editorContent != null ? editorContent : '');
      });
      editor.on('keyup change', () => {
        this.contentChanging.emit(editor.getContent());
      });

      editor.ui.registry.addButton('browseImage', {
        icon: 'image',
        tooltip: 'Insert Image',
        onAction: () => {

          this.showImagePopup();
          this.dialogSelectedImage.subscribe((url) => {
            if (this.dialogOpened) {

              const html = '<img  src=' + url + ' style=\'width: ' + this.imageWidth + '; height : ' + this.imageHeight + ';\'>';
              const marker = tinymce.activeEditor.dom.get('_dynamic_var');
              editor.selection.select(marker, false);

              editor.selection.setContent(html);

              editor.insertContent('');
              this.dialogOpened = false;
            }

          });

        }
      });
    }
  };

  constructor(public dialog: MatDialog,) {
  }

  ngOnInit() {

  }


  private showImagePopup() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '750px',
      height: '500px',
      position: {
        top: '10vh'
      },
      data: {selectedImage: this.selectedImage, imageWidth: this.imageWidth, imageHeight: this.imageHeight}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.dialogOpened = true;

      if (typeof (result) !== 'undefined') {
        this.imageWidth = result.imageWidth + 'px';
        this.imageHeight = result.imageHeight + 'px';
        if (typeof (result.selectedImage) !== 'undefined') {

          this.dialogSelectedImage.emit(result.selectedImage);
        }

      }


    });

  }
}
