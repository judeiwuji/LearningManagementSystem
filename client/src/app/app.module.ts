import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
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
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
