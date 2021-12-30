import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {FieldDataInterface} from '../../../models/field-data-interface';
import {FormFieldBase} from '../../../services/form-field-base';
import {FormGroup} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent    implements FieldDataInterface ,OnInit {
  @Input() field: FormFieldBase<string>;
  @Input() form: FormGroup;
  @Output() fieldChangingValue = new EventEmitter();
  get isRequired() {
  
    if ( this.form.controls[this.field.key].errors != null) {
      return !this.form.controls[this.field.key].errors.required || !this.form.controls[this.field.key].touched;
    }
    return true;
  }

  get isValid() {
    return this.form.controls[this.field.key].valid || !this.form.controls[this.field.key].touched;
  }

  get isMaxLength() {
    if (this.form.controls[this.field.key].errors === null) {
      return true;
    }
    return !this.form.controls[this.field.key].errors.invalidSize && !this.form.controls[this.field.key].touched;
  }
 constructor(private sanitized: DomSanitizer){}
 
 ngOnInit(){
 
setTimeout(() => {

  if( this.field.value && this.field){
    this.form.patchValue({[this.field.key]: this.field.value});
    this.form.get([this.field.key]).markAsDirty();
  }
  if(this.field.src && this.field.mediaType === 'video'){
    const fragment = this.create(this.field.src);
    const videoContainerElement = document.getElementById('video'+this.field.key);
    if(videoContainerElement){
      videoContainerElement.appendChild(fragment)
    }
   
  }
}, 1000);
 }

 create(htmlStr) {
  let  temp = document.createElement('div');
  temp.innerHTML = htmlStr;
  temp.classList.add('div-video-container')
  
  return temp;
}
  fieldChanged(fieldKey, file) {

   
    if( typeof(file) === 'object' ){
      if(this.field.src && this.field.mediaType === 'video'){
     
        const videoContainerElement = document.getElementById('video'+this.field.key);
        
        videoContainerElement.removeChild(videoContainerElement.childNodes[0]);
        videoContainerElement.removeChild(videoContainerElement.childNodes[1]);
      }
      this.form.patchValue({[fieldKey]: file});
      this.form.get([fieldKey]).markAsDirty();
  
      if (file.size> this.field.maxLength && this.field.maxLength>0) {
 
        this.form.get(this.field.key).setErrors({'invalidSize': true});
      } else {

        this.form.get(this.field.key).setErrors(null);
      }
    }

  }

  changeImageUrl(event){
    
    if( typeof(event) != 'object' ){
      
      const imageUrl = this.sanitized.bypassSecurityTrustResourceUrl(event);
      this.field.src='';
      this.fieldChangingValue.emit({'key': this.field.key, 'url':imageUrl ,'changeType' : 'uploadImage'});
  
      // this.fieldChangingValue.emit({'url':imageUrl, 'key': this.field.key,'changeType' : 'uploadImage' })
    }
  }
  convert(size){
    return (size / (1024*1024)).toFixed(0);

  }
  removeMedia() {
  
   if(this.field.mediaType === 'video'){
    
      this.form.patchValue({[this.field.key]: null});
      this.form.get([this.field.key]).markAsDirty();
     
     
     if(this.field.src){
      const videoContainerElement = document.getElementById('video'+this.field.key);
     
      videoContainerElement.removeChild(videoContainerElement.childNodes[0]);
      videoContainerElement.removeChild(videoContainerElement.childNodes[1]);
     }
    
     this.field.src =null;
    this.fieldChangingValue.emit({'key': this.field.key, 'changeType' : 'removeVideo'});
   }
   else{
    this.field.src =null;
    this.fieldChangingValue.emit({'key': this.field.key, 'changeType' : 'removeImage'});
   }
  
  
  }
  getImageText(){
    return this.field.imageTextTitle ? this.field.imageTextTitle :  'Upload Image';
  }

    parseVimeo(url) {
    const re = /\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i;
    const matches = re.exec(url);
    return matches && "https://player.vimeo.com/video/"+matches[1];
  }
}
