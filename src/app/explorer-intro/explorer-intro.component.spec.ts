import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorerIntroComponent } from './explorer-intro.component';

describe('ExplorerIntroComponent', () => {
  let component: ExplorerIntroComponent;
  let fixture: ComponentFixture<ExplorerIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplorerIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorerIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
