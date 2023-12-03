/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ImageUploaderService } from './image-uploader.service';

describe('Service: ImageUploader', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageUploaderService]
    });
  });

  it('should ...', inject([ImageUploaderService], (service: ImageUploaderService) => {
    expect(service).toBeTruthy();
  }));
});
