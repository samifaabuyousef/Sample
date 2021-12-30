import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelsDropdownComponent } from './channels-dropdown.component';

describe('ChannelsDropdownComponent', () => {
  let component: ChannelsDropdownComponent;
  let fixture: ComponentFixture<ChannelsDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChannelsDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChannelsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
