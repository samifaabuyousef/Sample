import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Tag} from '../../../cms/models/tag.model';
import {FormGroup, FormBuilder, FormArray, FormControl} from '@angular/forms';
import {Subject, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {TagService} from '../../../cms/tag/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  providers: [TagService]

})
export class TagsComponent implements OnInit {
  @Input() tags: Tag[];
  @Input() form: FormGroup;
  @Input() justUnDelatable = false;
  selecedTagValue: any[] = [];
  inheritedTagValue: any[] = [];
  tagsArray: any[] = [];
  @Input() editedElement: any;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSelectedTagValueChange = new EventEmitter();
  collapsedOpenItem: any;

  constructor(private fb: FormBuilder, public tagService: TagService) {
  }

  ngOnInit() {
    this.getAllTags();
    if (typeof (this.editedElement) !== 'undefined') {
      this.selecedTagValue = this.editedElement.tags.map((value) => ({tag_id: value.id, values: value.tag_values}));

      this.editedElement.inherited_tags.forEach(element => {

        const tempArray = element.tags.map((value) => ({tag_id: value.id, values: value.tag_values}));

        this.inheritedTagValue = this.inheritedTagValue.concat(tempArray);


      });

    }


  }

  toggleCollapse(id) {

    this.collapsedOpenItem = this.collapsedOpenItem === id ? null : id;
  }

  getAllTags() {
    this.tagService.getAll('', 'asc', 1, 1000).pipe(
      catchError(() => of([]))
    )
      .subscribe((data: PagedData<Tag>) => {

        if (data.data.length > 0) {
          if (this.justUnDelatable) {
            data.data.map((dataElement) => {
              if (dataElement.deletable === 0) {
                this.tagsArray.push(dataElement);
              }
            });
          } else {
            this.tagsArray = data.data;
          }

          this.tagsArray.forEach((element) => {
            this.createTagFormGroupe(element);
          });


        }
      });

  }

  createTagFormGroupe(tag: any) {
    let selectedValue = '';
    if (tag.select_type === 'single' || tag.field_type === 'bool') {
      const selectedTag = this.selecedTagValue.find(x => x.tag_id === tag.id);
      if (selectedTag != null) {
        selectedValue = selectedTag.values[0];
      }

    }

    const newFormGroup = this.fb.group({
      tag_id: [tag.id],
      tag_title: [tag.title],
      field_type: [tag.field_type],
      field_value: [selectedValue],
      select_type: [tag.select_type],
      values: new FormArray([]),
    });
    this.buildTagsValue(tag, newFormGroup);
    this.tagsFormArray.push(newFormGroup);

  }

  get f() {
    return this.form.controls;
  }

  get tagsFormArray() {
    return this.f.tags as FormArray;
  }

  buildTagsValue(tag, newFormGroup: FormGroup) {
    const tagsValueFormArray = newFormGroup.controls.values as FormArray;


    if (tag.field_type === 'bool') {

      tag.values = [

        {label: 'yes', value: 'Yes'},
        {label: 'no', value: 'No'},
      ];
    }
    const arr = tag.values.map(tagValue => {

      const inhertitedTag = this.inheritedTagValue.find(x => x.tag_id === tag.id && x.values.find(y => y === tagValue.value));

      const selectedTag = this.selecedTagValue.find(x => x.tag_id === tag.id && x.values.find(y => y === tagValue.value));

      const disabled = inhertitedTag != null ? true : false;
      let selectedBool = false;
      if ((selectedTag != null || inhertitedTag != null) && tag.field_type !== 'bool') {

        selectedBool = true;
        tagsValueFormArray.push(this.fb.group({
          selected: {value: [selectedBool], disabled},

          tagValue: [tagValue.value],
          tagLable: [tagValue.label]

        }));
      } else {
        tagsValueFormArray.push(this.fb.group({
          selected: [selectedBool],
          tagValue: [tagValue.value],
          tagLable: [tagValue.label]

        }));
      }


    });

  }


  get tagValueFormArray() {
    return this.f.tags as FormArray;
  }

  getTagFromGrop(tagValue: any) {

    return tagValue as FormGroup;
  }

  changeSelected(tagId, tagValue, tagType?, selectedType?) {

    const tag = this.selecedTagValue.findIndex(x => x.tag_id === tagId);


    if (tag !== -1) {


      if (tagType === 'bool' || selectedType === 'single') {

        this.selecedTagValue[tag].values.splice(0, this.selecedTagValue[tag].values.length);

      }
      const ExistedElementIndex = this.selecedTagValue[tag].values.findIndex(y => y === tagValue);

      if (ExistedElementIndex !== -1) {

        this.selecedTagValue[tag].values.splice(ExistedElementIndex, 1);
        if (this.selecedTagValue[tag].values.length === 0) {
          this.selecedTagValue.splice(tag, 1);
        }


      } else {
        this.selecedTagValue[tag].values.push(tagValue);
      }

    } else {
      this.selecedTagValue.push({
        tag_id: tagId,
        values: [tagValue]
      });
    }
    this.onSelectedTagValueChange.emit(this.selecedTagValue);

  }

}
