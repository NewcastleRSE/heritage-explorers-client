import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CosmoramaGameComponent } from './cosmorama-game.component';

describe('CosmoramaGameComponent', () => {
  let component: CosmoramaGameComponent;
  let fixture: ComponentFixture<CosmoramaGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CosmoramaGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CosmoramaGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
