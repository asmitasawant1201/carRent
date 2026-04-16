import { Component } from '@angular/core';
import { TabDataService } from '../services/tab-data.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-list',
  imports: [MatTableModule,MatButtonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
 constructor(private service: TabDataService){}
    dataSource:any[] = [];
    displayedColumns: string[] = ['id', 'name', 'department' , 'salary','Action'];


  ngOnInit(): void {
    this.loadData();
  }
  loadData(){
    this.service.getData().subscribe((res:any)=>{
      this.dataSource = res;
      console.log('data',this.dataSource)
    }
  )}

  onEdit(id:number){
    const user = this.dataSource.find(item => item.id === id);
    if(user){
      const newname= prompt('Enter new name', user.name);
      const newDepartment = prompt('Enter new department', user.department);
      const newSalary = prompt('Enter new salary', user.salary.toString());
      if (newname !== null && newDepartment !== null && newSalary !== null) {
        user.name = newname;
        user.department = newDepartment;
        user.salary = Number(newSalary);
      }
    }
  }

  onDelete(id:number){
    this.dataSource = this.dataSource.filter(item => item.id !== id);
    console.log('delete:',id)
  }

  addUser() {
  const name = prompt('Enter Name');
  const department = prompt('Enter Department');
  const salary = prompt('Enter Salary');

  if (name && department && salary) {
    const newUser = {
      id: this.dataSource.length + 1,
      name,
      department,
      salary: Number(salary)
    };

    this.dataSource.push(newUser);
    this.dataSource = [...this.dataSource];
  }
}
}
