import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CosmoramaGameMainComponent } from './cosmorama-game-main.component';

describe('CosmoramaGameMainComponent', () => {
  let component: CosmoramaGameMainComponent;
  let fixture: ComponentFixture<CosmoramaGameMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CosmoramaGameMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CosmoramaGameMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
