import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceIntroComponent } from './race-intro.component';

describe('RaceIntroComponent', () => {
  let component: RaceIntroComponent;
  let fixture: ComponentFixture<RaceIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
