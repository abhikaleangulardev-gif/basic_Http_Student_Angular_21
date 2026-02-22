import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../interface/student';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Http {
  myStudentApiUrls: string = 'https://basicstudentsapplication-default-rtdb.firebaseio.com/student.json';
  constructor(private http: HttpClient) { }

  postStudentList(stdObj: Student) {
    return this.http.post(this.myStudentApiUrls, stdObj);
  }

  getStudentList() {
    return this.http.get(this.myStudentApiUrls).pipe(
      map((student: any) => {
        let modifiedStudentList: Student[] = [];
        for (let std in student) {
          modifiedStudentList.push({ ...student[std], id: std })
        }
        console.log(modifiedStudentList);
        return modifiedStudentList;
      })
    )
  }

  deleteStudentList(std: any) {
    return this.http.delete('https://basicstudentsapplication-default-rtdb.firebaseio.com/student/' + std + '.json')
  }

  putStudentList(stdId: any, StudentObj: Student) {
    return this.http.put('https://basicstudentsapplication-default-rtdb.firebaseio.com/student/' + stdId + '.json', StudentObj)
  }
}
