import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loader not is visible', () => {
    component._loaderService$.setVisible(false);
    fixture.detectChanges();

    const loader = fixture.nativeElement.querySelector('#loader-overlay');
    expect(loader).toBeNull();
  });

  it('loader is visible', () => {
    component._loaderService$.setVisible(true);
    fixture.detectChanges();

    const loader = fixture.nativeElement.querySelector('#loader-overlay');
    expect(loader).not.toBeNull();
  });
});
