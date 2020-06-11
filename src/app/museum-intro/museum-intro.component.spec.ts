import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuseumIntroComponent } from './museum-intro.component';

describe('MuseumIntroComponent', () => {
  let component: MuseumIntroComponent;
  let fixture: ComponentFixture<MuseumIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuseumIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuseumIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
