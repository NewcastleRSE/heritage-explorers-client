import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuseumGameComponent } from './museum-game.component';

describe('MuseumGameComponent', () => {
  let component: MuseumGameComponent;
  let fixture: ComponentFixture<MuseumGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuseumGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuseumGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
