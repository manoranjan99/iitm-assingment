import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GrantAccessDialogComponent } from './grant-access-dialog/grant-access-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// Main component
export class AppComponent implements OnInit {

  location_enabled:boolean;
  camera_enabled:boolean;

  constructor(public dialog:MatDialog) {}

  ngOnInit(): void {
    this.update_permission_if_revoked();
    this.update_permission_variable();
  }

  // open dialog to approve permission
  open_permission_dialog()
  {

    const GrantAccessDialogComponent_Reference = this.dialog.open(GrantAccessDialogComponent,{width:'40%'});

    GrantAccessDialogComponent_Reference.afterClosed().subscribe(()=>{
        this.update_permission_variable();
    })
    
  }

  //update permission variable according to user response
  private update_permission_variable()
  {
    if(localStorage.getItem("iitm_website_location") == "location_granted") {   this.location_enabled=true;   }
    else { this.location_enabled=false;  }

    if(localStorage.getItem("iitm_website_camera") == "camera_granted") {   this.camera_enabled=true;   }
    else { this.camera_enabled=false;  }

  }

  //if users changes permission in setting, update the permission value.
  private update_permission_if_revoked()
  {

    // permission revoke is depricated, only we can use permissions query

    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted") {
        localStorage.setItem("iitm_website_location","location_granted");  this.location_enabled=true;   // already in access
      } else {
        localStorage.removeItem("iitm_website_location");  this.location_enabled=false;   // denied or not given permission
    }});


    // navigator permission query is not there for camera
    if(localStorage.getItem("iitm_website_camera") == "camera_granted"){

      navigator.mediaDevices.getUserMedia( { audio: false, video: true } )
      .then( ( stream ) => {
        localStorage.setItem("iitm_website_camera","camera_granted"); this.camera_enabled=true; // already in access    
      },
      error => {
        localStorage.removeItem("iitm_website_camera");  this.camera_enabled=false;  // denied or not given permission
      } );

    }


  }


}
