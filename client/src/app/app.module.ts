import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { MainNavbarComponent } from './components/main-navbar/main-navbar.component';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import { ForgottenPasswordComponent } from './pages/forgotten-password/forgotten-password.component';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardNavbarComponent } from './components/dashboard-navbar/dashboard-navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { ClassroomsComponent } from './pages/classrooms/classrooms.component';
import { StudentsComponent } from './pages/students/students.component';
import { LecturersComponent } from './pages/lecturers/lecturers.component';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { AddBtnComponent } from './components/add-btn/add-btn.component';
import { LoadMoreBtnComponent } from './components/load-more-btn/load-more-btn.component';
import { FootNoteComponent } from './components/foot-note/foot-note.component';
import { MoreOptionBtnComponent } from './components/more-option-btn/more-option-btn.component';
import { DepartmentFormComponent } from './modals/department-form/department-form.component';
import { LoadingComponent } from './components/loading/loading.component';
import { StudentFormComponent } from './modals/student-form/student-form.component';
import { DepartmentDropdownListComponent } from './components/department-dropdown-list/department-dropdown-list.component';
import { LevelDropdownListComponent } from './components/level-dropdown-list/level-dropdown-list.component';
import { LecturerFormComponent } from './modals/lecturer-form/lecturer-form.component';
import { StatsCardComponent } from './components/stats-card/stats-card.component';
import {
  faChalkboardTeacher,
  faListAlt,
  faNewspaper,
  faTasks,
  faUsers,
  faWifi,
} from '@fortawesome/free-solid-svg-icons';
import { AuthInterceptor } from './auth.interceptor';
import { ClassroomFormComponent } from './modals/classroom-form/classroom-form.component';
import { ClassroomDetailComponent } from './pages/classroom-detail/classroom-detail.component';
import { ClassroomStudentFormComponent } from './modals/classroom-student-form/classroom-student-form.component';
import { ActionBtnComponent } from './components/action-btn/action-btn.component';
import { VirtualClassroomComponent } from './pages/virtual-classroom/virtual-classroom.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    HomeComponent,
    MainNavbarComponent,
    MainFooterComponent,
    ForgottenPasswordComponent,
    DashboardNavbarComponent,
    ClassroomsComponent,
    StudentsComponent,
    LecturersComponent,
    DepartmentsComponent,
    SettingsComponent,
    SearchFormComponent,
    AddBtnComponent,
    LoadMoreBtnComponent,
    FootNoteComponent,
    MoreOptionBtnComponent,
    DepartmentFormComponent,
    LoadingComponent,
    StudentFormComponent,
    DepartmentDropdownListComponent,
    LevelDropdownListComponent,
    LecturerFormComponent,
    StatsCardComponent,
    ClassroomFormComponent,
    ClassroomDetailComponent,
    ClassroomStudentFormComponent,
    ActionBtnComponent,
    VirtualClassroomComponent,
    BreadcrumbComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    ToastrModule.forRoot({ timeOut: 2000, progressBar: true }),
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    // Add an icon to the library for convenient access in other components
    library.addIcons(faUsers);
    library.addIcons(faListAlt);
    library.addIcons(faWifi);
    library.addIcons(faChalkboardTeacher);
    library.addIcons(faChalkboardTeacher);
    library.addIcons(faNewspaper);
    library.addIcons(faTasks);
  }
}
