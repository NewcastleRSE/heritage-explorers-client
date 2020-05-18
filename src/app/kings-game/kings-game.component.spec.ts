import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KingsGameComponent } from './kings-game.component';

describe('KingsGameComponent', () => {
  let component: KingsGameComponent;
  let fixture: ComponentFixture<KingsGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KingsGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KingsGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
