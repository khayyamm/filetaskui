import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadPublicFileComponent } from './download-public-file.component';

describe('DownloadPublicFileComponent', () => {
  let component: DownloadPublicFileComponent;
  let fixture: ComponentFixture<DownloadPublicFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadPublicFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadPublicFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
