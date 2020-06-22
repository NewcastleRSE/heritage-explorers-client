import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceWinComponent } from './race-win.component';

describe('RaceWinComponent', () => {
  let component: RaceWinComponent;
  let fixture: ComponentFixture<RaceWinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceWinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceWinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
