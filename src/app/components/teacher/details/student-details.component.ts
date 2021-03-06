 import { Component, OnInit } from '@angular/core';
 import { Router,ActivatedRoute} from '@angular/router';
 import { ToastrService } from 'ngx-toastr';

 // Services
 import { StudentService } from '../../../services/student/student.service';
 import { routerTransition } from '../../../services/config/config.service';

 @Component({
 	selector: 'app-student-details',
 	templateUrl: './student-details.component.html',
 	styleUrls: ['./student-details.component.css'],
 	animations: [routerTransition()],
 	host: {'[@routerTransition]': ''}
 })

 export class StudentDetailsComponent implements OnInit {
	subjectList:any;
 	index:any;
	studentDetail:any;

 	constructor(private router: Router, private route: ActivatedRoute, private studentService:StudentService,private toastr: ToastrService) { 
 		// Get user detail index number sent in params
 		this.route.params.subscribe(params => {
 			this.index = params['id'];
 			if (this.index && this.index != null && this.index != undefined) {
 				this.getStudentDetails(this.index);
 			}
 		});
 	}

 	ngOnInit() {}

 	// Get student details 
 	getStudentDetails(index:number){

		this.studentService.getAllStudents().subscribe((response: Response) => {
			if(response.status == 200) {
				var data = JSON.parse(response['_body']);
				for(var i = 0; i< data.length; i++) {
					if(data[i]['id'] == index) {
						this.studentDetail = data[i];
						this.toastr.success("Success", "Successfully loaded student detail");
					}
				}
			}
		})
	}

}