import { TestBed } from '@angular/core/testing';

import { MaterialIconsService } from './material-icons.service';

describe('MaterialIconsService', () => {
  let service: MaterialIconsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialIconsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
