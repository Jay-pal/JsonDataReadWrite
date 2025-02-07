import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JsondataService } from 'src/services/jsondata.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent {

  constructionForm!: FormGroup;
  today = this.formatDate(new Date());
  tomorrow = this.formatDate(new Date(new Date().setDate(new Date().getDate() + 1)));
  dayAfterTomorrow = this.formatDate(new Date(new Date().setDate(new Date().getDate() + 2)));
  SamplingTime = this.today;

  constructor(private fb: FormBuilder, private _router: Router, private _jsonService: JsondataService) {
    this.constructionForm = this.fb.group({
      projectName: new FormControl(''),
      constructionCount: new FormControl(''),
      isConstructionCompleted: new FormControl(false),
      lengthOfRoad: new FormControl('')
    });
  }

  data: { SamplingTime: string; Properties: { Label: string; Value: any }[] } = {
    SamplingTime: '',
    Properties: []
  };

  onSubmit() {
    if (this.constructionForm.valid) {

      const newProperties = this.constructionForm.value;

      const properties = Object.keys(newProperties)
        .map(key => {
          if (key === 'projectName') {
            return {
              Label: 'Project Name',
              Value: newProperties[key]
            };
          } else if (key === 'constructionCount') {
            return {
              Label: "Construction Count",
              Value: newProperties[key]
            };
          } else if (key === 'isConstructionCompleted') {
            return {
              Label: "Is Construction Completed",
              Value: newProperties[key]
            };
          }
          else if (key === 'lengthOfRoad') {
            return {
              Label: "Length of the road",
              Value: newProperties[key]
            };
          }
          else {
            return {
              Label: key,
              Value: newProperties[key]
            };
          }
        })

      this.data = {
        SamplingTime: this.SamplingTime,
        Properties: properties
      };

      this._jsonService.addNewJsonData(this.data).subscribe({
        next: () => {
          if (window.confirm("Added Successfully. Do you want to go back to the home page?")) {
            this.constructionForm.reset();
            this._router.navigate(['']);
          }
        },

        error: (err) => {
          alert("Some Problem Ocurred");
        }
      });

    }
    else {
      alert("There is some problem..");
    }
  }

  formatDate(date: Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format

    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getFullYear()} ${formattedHours}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
  }


  selectTime(time: any){
    this.SamplingTime = time.toString();
  }
}
