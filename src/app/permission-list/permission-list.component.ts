import { Component, OnInit } from '@angular/core';
import { Permission, List } from '../permissions';

const getAccesButton = document.getElementsByClassName('get-access');
const successAccess = document.getElementsByClassName('allowed');
const declineAccess = document.getElementsByClassName('not-allowed');

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.css']
})

export class PermissionListComponent implements OnInit {

  permissionList: Permission[];
  totalPermissionsRequired: number;
  permissionsReceived: number;

  constructor() { }

  ngOnInit(): void {
    this.permissionList = List;
    this.totalPermissionsRequired = this.permissionList.length;
    this.permissionsReceived = 0;
    console.log(this.permissionList);
  }

  getAccess(index) {
    switch (this.permissionList[index].name) {
      case 'camera': this.getCameraAccess(index);
        break;
      case 'location': this.getLocationAccess(index);
        break;
      case 'microphone': this.getMicrophoneAccess(index);
        break;
      case 'notifications': this.getNotificationAccess(index);
        break;
      case 'bg-sync': this.getBgSyncAccess(index);
        break;
      case 'clipboard': this.getClipBoardAccess(index);
        break;
    }
    getAccesButton[index].classList.add('hidden');
  }

  getCameraAccess = async (index) => {
    let constraints = {
      audio: false,
      video: true
    };

    try {
      await navigator.mediaDevices.getUserMedia(constraints);
      successAccess[index].classList.remove('hidden');
      this.permissionsReceived++;
    } catch (err) {
      console.log(err);
      declineAccess[index].classList.remove('hidden');
    }
  }

  getLocationAccess = (index) => {
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        successAccess[index].classList.remove('hidden');
        this.permissionsReceived++;
      }, () => { declineAccess[index].classList.remove('hidden'); });
    } catch (err) {
      console.log(err);
    }
  }

  getMicrophoneAccess = async (index) => {
    let constraints = {
      audio: true
    };
    try {
      await navigator.mediaDevices.getUserMedia(constraints);
      successAccess[index].classList.remove('hidden');
      this.permissionsReceived++;
    } catch (err) {
      console.log(err);
      declineAccess[index].classList.remove('hidden');
    }
  }

  getNotificationAccess = async (index) => {
    try {
      let permission = await Notification.requestPermission();
      if (permission == 'granted') {
        successAccess[index].classList.remove('hidden');
        this.permissionsReceived++;
      }
      else {
        declineAccess[index].classList.remove('hidden');
      }
    } catch (err) {
      console.log(err);
    }
  }

  getBgSyncAccess = async (index) => {
    let permission = await navigator.permissions.query({ name: 'background-sync' });
    if (permission.state == 'denied')
      declineAccess[index].classList.remove('hidden');
    else {
      successAccess[index].classList.remove('hidden');
      this.permissionsReceived++;
    }
  }

  getClipBoardAccess = async (index) => {
    try {
      await navigator.clipboard.readText();
      successAccess[index].classList.remove('hidden');
      this.permissionsReceived++;
    } catch (err) {
      console.log(err);
      declineAccess[index].classList.remove('hidden');
    }

  }

}
