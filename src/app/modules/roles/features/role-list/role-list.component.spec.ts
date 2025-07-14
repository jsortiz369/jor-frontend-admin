import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';

import { RoleListComponent } from './role-list.component';
import { AlertService } from '../../../../shared/services/alert/alert.service';
import { LoaderService } from '../../../../shared/services';
import { ActivatedRoute } from '@angular/router';

describe('RoleListComponent', () => {
  let component: RoleListComponent;
  let fixture: ComponentFixture<RoleListComponent>;
  let alertService: AlertService;
  let loadingService: LoaderService;
  let confirmationService: ConfirmationService;
  let messageService: MessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleListComponent, NoopAnimationsModule],
      providers: [
        ConfirmationService,
        MessageService,
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RoleListComponent);
    component = fixture.componentInstance;
    alertService = TestBed.inject(AlertService);
    loadingService = TestBed.inject(LoaderService);
    confirmationService = TestBed.inject(ConfirmationService) as jasmine.SpyObj<ConfirmationService>;
    messageService = TestBed.inject(MessageService) as jasmine.SpyObj<MessageService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
