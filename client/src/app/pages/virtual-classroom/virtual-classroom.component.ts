import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { map, switchMap } from 'rxjs';
import { Classroom } from 'src/app/models/ClassRoom';
import { JitsiMeetOptions } from 'src/app/models/Jitsi';
import { User } from 'src/app/models/User';
import { ClassRoomStatus } from 'src/app/models/enums/ClassroomStatus';
import { AuthService } from 'src/app/services/auth.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { MeetingService } from 'src/app/services/meeting.service';
declare class JitsiMeetExternalAPI {
  constructor(domain: string, options: JitsiMeetOptions);
  executeCommand(command: string, ...value: any[]): void;
  addListener(event: string, listener: (data: any) => void): void;
  removeListener(event: string, listener: (data: any) => void): void;
  getRoomsInfo(): Promise<{ rooms: any[] }>;
}

@Component({
  selector: 'app-virtual-classroom',
  templateUrl: './virtual-classroom.component.html',
  styleUrls: ['./virtual-classroom.component.css'],
})
export class VirtualClassroomComponent implements OnInit {
  loading = true;
  profile!: User;
  closeTimeout: any;
  classRoom!: Classroom;
  authenticated = true;
  faArrowLeft = faArrowLeft;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly meetingService: MeetingService,
    private readonly authService: AuthService,
    private readonly classroomService: ClassroomService,
    private readonly toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const classRoomId = Number(this.activatedRoute.snapshot.params['id']);

    this.classroomService
      .getClassroom(classRoomId)
      .pipe(
        switchMap((classRoom) =>
          this.authService
            .currentUser()
            .pipe(map((profile) => ({ classRoom, profile })))
        )
      )
      .subscribe({
        next: (response) => {
          this.classRoom = response.classRoom;
          this.profile = response.profile;
          this.meetingService.loadScript().then(() => {
            this.loading = false;
            this.initMeeting();
          });
        },
      });
  }

  initMeeting() {
    const domain = 'meet.jit.si';
    const options: JitsiMeetOptions = {
      height: '100%',
      width: '100%',
      parentNode: document.querySelector('#meeting-container') as Element,
      roomName: `${this.classRoom.title} By ${this.classRoom.lecturer.user.firstname} ${this.classRoom.lecturer.user.lastname}`,
      userInfo: {
        displayName: `${this.profile.firstname} ${this.profile.lastname}`,
        email: `${this.profile.email}`,
      },
      configOverwrite: {
        prejoinPageEnabled: false,
      },
    };
    if (this.profile.lecturer) {
      this.updateClassRoomStatus(ClassRoomStatus.ACTIVE);
    }
    const api = new JitsiMeetExternalAPI(domain, options);

    api.addListener('videoConferenceLeft', (event) => {
      this.leaveMeeting();
    });

    api.addListener('errorOccurred', (event) => {
      if (event.error.name === 'conference.connectionError.membersOnly') {
        this.authenticated = false;
        if (this.profile.lecturer) {
          this.updateClassRoomStatus(ClassRoomStatus.CLOSE);
        }
      }
    });
    console.log(api);
  }

  updateClassRoomStatus(status: ClassRoomStatus) {
    if (this.profile.lecturer) {
      this.classroomService
        .updateClassroom({ status }, this.classRoom.id)
        .subscribe({
          next: () => {},
          error: (err) => {
            this.toastr.warning(err.error.error || err.statusText);
          },
        });
    }
  }

  leaveMeeting() {
    if (this.closeTimeout) return;

    this.closeTimeout = setTimeout(() => {
      if (this.authenticated) {
        this.updateClassRoomStatus(ClassRoomStatus.CLOSE);
        if (this.profile.lecturer)
          this.router.navigate([`/classrooms/${this.classRoom.id}`]);
        else this.router.navigate([`/student/classrooms`]);
      }
      this.authenticated = true;
      this.closeTimeout = null;
    }, 1000);
  }

  leaveClassroom() {
    if (this.profile.lecturer) {
      this.updateClassRoomStatus(ClassRoomStatus.CLOSE);
      this.router.navigate([`/classrooms/${this.classRoom.id}`]);
    } else {
      this.router.navigate([`/student/classrooms`]);
    }
  }
}
