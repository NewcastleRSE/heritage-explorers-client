import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KingsIntroComponent } from './kings-intro.component';

describe('KingsIntroComponent', () => {
  let component: KingsIntroComponent;
  let fixture: ComponentFixture<KingsIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KingsIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KingsIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
