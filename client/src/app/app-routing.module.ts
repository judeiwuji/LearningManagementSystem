import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ForgottenPasswordComponent } from './pages/forgotten-password/forgotten-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { ClassroomsComponent } from './pages/classrooms/classrooms.component';
import { StudentsComponent } from './pages/students/students.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { LecturersComponent } from './pages/lecturers/lecturers.component';
import { ClassroomDetailComponent } from './pages/classroom-detail/classroom-detail.component';
import { VirtualClassroomComponent } from './pages/virtual-classroom/virtual-classroom.component';
import { QuizzesComponent } from './pages/quizzes/quizzes.component';
import { QuizDetailComponent } from './pages/quiz-detail/quiz-detail.component';
import { StudentClassroomsComponent } from './pages/student-classrooms/student-classrooms.component';
import { StudentQuizResultsComponent } from './pages/student-quiz-results/student-quiz-results.component';
import { QuizIntroComponent } from './pages/quiz-intro/quiz-intro.component';
import { QuizMainComponent } from './pages/quiz-main/quiz-main.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgotpassword', component: ForgottenPasswordComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'departments',
    component: DepartmentsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'classrooms',
    component: ClassroomsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'classrooms/:id',
    component: ClassroomDetailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'classrooms/:id/virtual',
    component: VirtualClassroomComponent,
    canActivate: [authGuard],
  },
  {
    path: 'classrooms/:id/quizzes',
    component: QuizzesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'classrooms/:id/quizzes/:qid',
    component: QuizDetailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'student/classrooms',
    component: StudentClassroomsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'student/quizresults',
    component: StudentQuizResultsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'students',
    component: StudentsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'lecturers',
    component: LecturersComponent,
    canActivate: [authGuard],
  },
  {
    path: 'quiz/intro/:cid/:id',
    component: QuizIntroComponent,
    canActivate: [authGuard],
  },
  {
    path: 'quiz/start/:cid/:id',
    component: QuizMainComponent,
    canActivate: [authGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
