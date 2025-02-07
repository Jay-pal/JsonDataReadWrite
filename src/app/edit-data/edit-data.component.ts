import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JsondataService } from 'src/services/jsondata.service';
import { map } from 'rxjs/operators'
import { Data } from '../property';

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.css']
})
export class EditDataComponent implements OnInit {

  editDataForm!: FormGroup;
  today = this.formatDate(new Date());
  tomorrow = this.formatDate(new Date(new Date().setDate(new Date().getDate() + 1)));
  dayAfterTomorrow = this.formatDate(new Date(new Date().setDate(new Date().getDate() + 2)));
  SamplingTime = this.today;
  data!: Data;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private _jsonService: JsondataService,
    private _router: Router
  ) {
    this.editDataForm = this.fb.group({
      projectName: new FormControl(''),
      constructionCount: new FormControl(''),
      isConstructionCompleted: new FormControl(false),
      lengthOfRoad: new FormControl('')
    })
  }

  editData: { SamplingTime: string; Properties: { Label: string; Value: any }[] } = {
    SamplingTime: '',
    Properties: []
  };

  id!: string;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.getData();
  }

  selectTime(time: any) {
    this.SamplingTime = time.toString();
  }

  formatDate(date: Date): string {
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

  getData() {
    this._jsonService.getJsonData().pipe(
      map(data =>
        Array.isArray(data) ? data.find(data => data.id === this.id) : null
      )
    ).subscribe({
      next: (res) => {
        if (res) {
          this.data = res;
          const formValues = {
            projectName: this.data.Properties.find((p) => (p as { Label: string; Value: any }).Label === "Project Name")?.Value || '',
            constructionCount: this.data.Properties.find((p) => (p as { Label: string; Value: any }).Label === "Construction Count")?.Value || '',
            isConstructionCompleted: this.data.Properties.find((p) => (p as { Label: string; Value: any }).Label === "Is Construction Completed")?.Value || false,
            lengthOfRoad: this.data.Properties.find((p) => (p as { Label: string; Value: any }).Label === "Length of the road")?.Value || ''
          };
          this.editDataForm.patchValue(formValues);
        }
      },
      error: (err) => {
        alert("There is some problem while fetching the details...");
      }
    });
  }

  onSubmit(value: any) {

    const updatedData: Data = {
      id: this.data.id,  // Keep the same ID
      SamplingTime: this.SamplingTime, // Keep the selected SamplingTime
      Properties: [
        { Label: "Project Name", Value: value.projectName },
        { Label: "Construction Count", Value: value.constructionCount },
        { Label: "Is Construction Completed", Value: value.isConstructionCompleted },
        { Label: "Length of the road", Value: value.lengthOfRoad }
      ]
    };

    console.log(value)
    this._jsonService.updateData(this.id, updatedData).subscribe({
      next: (res) => {
        if (window.confirm("Updated Successfully. Do you want to go back to the home page?")) {
          this.editDataForm.reset();
          this._router.navigate(['']);
        }
      },
      error: (err) => {
        console.log("error !!")
      }
    });
  }
}
