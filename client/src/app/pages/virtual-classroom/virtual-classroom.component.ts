import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  executeCommand(command: string, value?: string): void;
  addListener(event: string, listener: (data: any) => void): void;
  removeListener(event: string, listener: (data: any) => void): void;
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
        role: this.profile.lecturer ? 'moderator' : 'participant',
      },
    };
    const api = new JitsiMeetExternalAPI(domain, options);
    api.addListener('videoConferenceLeft', (event) => {
      if (this.closeTimeout) return;

      this.updateClassRoomStatus(ClassRoomStatus.CLOSE);
      this.closeTimeout = setTimeout(() => {
        if (this.profile.lecturer)
          this.router.navigate([`/classrooms/${this.classRoom.id}`]);
        else this.router.navigate([`/student/classrooms`]);
      }, 1000);
    });

    api.addListener('videoConferenceJoined', (event) => {
      this.updateClassRoomStatus(ClassRoomStatus.ACTIVE);
    });
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
}
