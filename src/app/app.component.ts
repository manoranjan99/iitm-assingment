import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GrantAccessDialogComponent } from './grant-access-dialog/grant-access-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'iitm-assignment';
  location_enabled:boolean;
  camera_enabled:boolean;

  constructor(public dialog:MatDialog) {}

  ngOnInit(): void {
    this.update_permission_variable();
  }

  open_permission_dialog()
  {
    const GrantAccessDialogComponent_Reference = this.dialog.open(GrantAccessDialogComponent);

    GrantAccessDialogComponent_Reference.afterClosed().subscribe(()=>{
        this.update_permission_variable();
    })
    
  }

  private update_permission_variable()
  {
    if(localStorage.getItem("iitm_website_location") == "location_granted") {   this.location_enabled=true;   }
    else { this.location_enabled=false;  }

    if(localStorage.getItem("iitm_website_camera") == "camera_granted") {   this.camera_enabled=true;   }
    else { this.camera_enabled=false;  }

  }



}
