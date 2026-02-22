import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http } from '../../shared/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { Student } from '../../interface/student';
import { firstLetterCaptialize } from '../../pipe/firstletterCaptialize.pipe';


@Component({
  selector: 'app-one',
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatCardModule, MatInputModule, MatFormFieldModule, MatTableModule,firstLetterCaptialize],
  templateUrl: './one.html',
  styleUrl: './one.css',
})
export class One implements OnInit {
  myStudentForm!: FormGroup;

  myEditStudentData: WritableSignal<any> = signal('');
  constructor(private httpservice: Http, private fb: FormBuilder) { }

  // table
  // STUDENT_DATA: Student[] = [];
  STUDENT_DATA: WritableSignal<Student[]> = signal([]);

  displayStudentColumn: string[] = ['srNo', 'id', 'fullName', 'image', 'contactNumber', 'email', 'action'];
  dataStudentSource = this.STUDENT_DATA;

  ngOnInit(): void {
    this.initialStudentForm();
    this.getStudentList();
  }

  initialStudentForm() {
    this.myStudentForm = this.fb.group({
      fullName: this.fb.control('', Validators.required),
      image: this.fb.control('', Validators.required),
      contactNumber: this.fb.control(0, Validators.required),
      email: this.fb.control('', Validators.required),
    })
  }

  CreateStudent() {
    if (this.myStudentForm.valid) {
      // console.log(this.myStudentForm.value);

      if (this.myEditStudentData()) {
        // update form
        this.httpservice.putStudentList(this.myEditStudentData(), this.myStudentForm.value).subscribe({
          next: (_resp: any) => {
            console.log(_resp);
            this.getStudentList();
            this.myStudentForm.reset();
            this.myEditStudentData.set(null);
          },
          error: (_error: Error) => console.log(_error),
          complete: () => alert(`Successfully Update student id details ${this.myEditStudentData()}`)
        })
      } else {

        // create form
        const myCreateStudentPayLoad = this.myStudentForm.value;

        this.httpservice.postStudentList(myCreateStudentPayLoad).subscribe({
          next: (_resp: any) => {
            console.log(_resp.name);
            this.getStudentList();
            this.myStudentForm.reset();
          }
        })
      }
    } else {
      alert('do not completed student information.....');
    }
  }

  getStudentList() {
    this.httpservice.getStudentList().subscribe({
      next: (_resp: any) => {
        console.log(_resp);
        // this.STUDENT_DATA = _resp;
        this.STUDENT_DATA.set(_resp);
        console.log(' this.STUDENT_DATA ', this.STUDENT_DATA())
      },
      error: (_Error: Error) => {
        console.log(_Error);
      }
    })
  };

  onDeleteStudent(student: any) {
    console.log(student.id);
    const myDeleteStudentUniqueId = student.id;
    this.httpservice.deleteStudentList(myDeleteStudentUniqueId).subscribe({
      next: (_resp: any) => {
        console.log(_resp),
          this.getStudentList();
        alert('Successfully Delete....');
      },
      error: (_Error: Error) => console.log(_Error),
    })
  }


  onUpdateStudent(student: any) {
    this.myEditStudentData.set(student.id);
    delete student.id;
    // console.log(this.myEditStudentData());
    this.myStudentForm.setValue(student);
  }
}
