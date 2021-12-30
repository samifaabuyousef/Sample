import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, RouterLinkActive, Routes} from '@angular/router';
import {ModuleService} from '../../../cms/content/module/module.service';
import {objectToFormData} from 'object-to-formdata';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements OnInit {
  animal: string;
  name: string;
  selectedImage: any;
  imageHeight: any;
  imageWidth: any;
  loading = false;
  selectedIndex: number;
  images: any [] = [];
  value = 0;

  constructor(private route: ActivatedRoute,
              private cd: ChangeDetectorRef,
              private router: Router,
              public dialogRef: MatDialogRef<DialogComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private  moduleService: ModuleService) {

    this.moduleService.getMediaImage().subscribe(
      res => {

        this.images = res.data;
        this.cd.detectChanges();
      }
    );
  }


  ngOnInit() {
  }

  onSelectImage(index, image) {
    this.data.selectedImage = image;
    this.selectedIndex = index;
  }

  onHeightChange(data) {

    this.data.imageHeight = data.target.value;
  }

  onWidthChange(data) {

    this.data.imageWidth = data.target.value;
  }

  imageChanged(file) {
    this.loading = true;

    const fileData = {'image': file};
    const data = objectToFormData(fileData, {indices: true});
    this.moduleService.UploadImage(data).subscribe((ImageData) => {
      this.loading = false;

      this.data.selectedImage = ImageData.image;
      this.cd.detectChanges();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
