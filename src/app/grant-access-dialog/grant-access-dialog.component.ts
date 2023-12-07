import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, catchError } from 'rxjs';


@Component({
  selector: 'app-grant-access-dialog',
  templateUrl: './grant-access-dialog.component.html',
  styleUrls: ['./grant-access-dialog.component.css']
})
export class GrantAccessDialogComponent implements OnInit {

  dialog_content:string="All Set!";
  font_icon:string='check_circle_outline';

  button_visible=true;
  location_enabled:boolean=false;
  camera_enabled:boolean=false;

  constructor(private dialogRef: MatDialogRef<GrantAccessDialogComponent>){ }

  ngOnInit(): void {
    this.set_variables();
    this.set_content();
  }

  private set_variables()
  {

    if(localStorage.getItem("iitm_website_location") == "location_granted") {   this.location_enabled=true;   }
    else { this.location_enabled=false;  }

    if(localStorage.getItem("iitm_website_camera") == "camera_granted") {   this.camera_enabled=true;   }
    else { this.camera_enabled=false;  }

  }

  private set_content()
  {
     if(this.location_enabled == false )
     {

        this.font_icon="location_on";
        this.dialog_content="Location permissions are required to access the web page";

     }else if(this.location_enabled == true && this.camera_enabled == false)
     {

        this.font_icon="camera_alt";
        this.dialog_content= "Camera permissions are required to access the web page";

     }

  }

  click_continue_button()
  {
    if(this.location_enabled == false )
    {

      this.button_visible=false;
      this.font_icon="location_on";
      this.dialog_content="Click on allow in the pop up. You will not be able to proceed further without providing location access.";
      this.location_access();

    }else if(this.location_enabled == true && this.camera_enabled == false)
    {

      this.button_visible=false;
      this.font_icon="camera_alt";
      this.dialog_content= "Click on allow in the pop up. You will not be able to proceed further without providing camera access.";
      this.camera_access();

    }else if(this.location_enabled == true && this.camera_enabled == true)
    {
      this.dialogRef.close();
    }

  }


  private camera_access()
  {
     const mediaStreamConstraints = {
      audio: false,
      video: true
     }; 

     navigator.mediaDevices.getUserMedia(mediaStreamConstraints).then((MediaStream:any) =>{

      console.log(MediaStream)
      this.camera_enabled=true;
      this.button_visible=true;
      localStorage.setItem("iitm_website_camera", "camera_granted");
      this.font_icon="check_circle_outline";
      this.dialog_content= "Permission granted"


     }).catch((error:any)=>{

      console.log(error)
      this.dialog_content= "Please modify camera access in setting only for this site. You will not be able to proceed further without providing camera access."

     })

  }

  private location_access()
  {

    this.get_location().subscribe((response:any) => {

      this.location_enabled=true;
      localStorage.setItem("iitm_website_location", "location_granted");
      this.font_icon="camera_alt";
      this.dialog_content= "Camera permissions are required to access the web page";
      this.button_visible=true;

     }, (error:any) =>{
        this.dialog_content= "Please allow location in setting only for this site. You will not be able to proceed further without providing location access."
     })

  }

  // get location return as observable
  get_location():Observable<any>
  {
    return new Observable(obs => {
      navigator.geolocation.getCurrentPosition(
        success => {
          obs.next(success);
          obs.complete();
          
        },error => {
          obs.error(error);
        }
      )
    })

  }


}
