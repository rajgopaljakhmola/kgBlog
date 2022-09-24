import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardForm: FormGroup
  currentListData: any
  listItems = [
    {
      id: 1,
      itemTitle: '',
      itemImg: '',
      itemDescription: ''
    }
  ]
  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private apiService: ApiService) {
    this.dashboardForm = this.fb.group({
      title: '',
      description: '',
      date: '',
      mainImg: '',
      listTitle: '',
      listItem: this.fb.array([
        this.fb.group(
          {
            id: 1,
            itemTitle: '',
            itemImg: '',
            itemDescription: ''
          }
        )
      ])
    })
  }
  
  @ViewChild('dashboard') dashboard: any;
  itemNumber: number = 1
  ngOnInit(): void {
    this.currentDate()
    // console.log(this.dashboardForm.controls['listItem'])
  }
  listItemControls() {
    // const listItem: any = this.dashboardForm.get('listItem')
    const listItem: any = this.dashboardForm.controls['listItem']
    return listItem.controls
  }
  hasChange:any
  ngAfterViewInit() {
    this.dashboardForm.controls['listItem'].valueChanges
    // console.log(this.hasChange)
  }
  getFormDate() {
    const date = this.dashboardForm.get("date")?.value
    return this.formatDate(date)
  }
  getFormData(control: any) {
    const data = this.dashboardForm.get(control)?.value
    return data
  }
  getListImgData(control: any) {
    const listData = control
    const data = this.dashboardForm.get('listItem')?.value
    const val = data.find((obj: any) => {
      return obj.id === listData.id
    })
    return val.itemImg
  }


  loadImage(event: any, controlName: any) {
    const reader = new FileReader();

    console.log(reader)
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.dashboardForm.controls[controlName].setValue(reader.result)
      };
      event.target.value = ''
    }
  }

  sendData(data: any) {
    this.currentListData = data
  }

  loadListImage(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.currentListData.itemImg = reader.result
      };
      event.target.value = ''
    }
    console.log(this.dashboardForm.get('listItem')?.value)
  }
  formatDate(date: any) {
    if (date) {
      const [, month, day, year] = new Date(date).toDateString().split(" ")
      const formattedDate = `${day} ${month}, ${year}`
      return formattedDate
    } else {
      return null
    }
  }
  currentDate() {
    const [, month, day, year] = new Date().toDateString().split(" ")
    return `${year}-${month}-${day}`
  }
  changeDate() {
    this.dashboardForm.controls['date'].setValue('')
  }
  removeFormControlValue(formContronName: any) {
    this.dashboardForm.controls[formContronName].setValue('')
    console.log("Deleted")
    console.log(this.dashboardForm.get(formContronName)?.value)
  }
  removeListImgData(controlObj: any) {
    controlObj.itemImg = ''
    console.log("triggered")
  }
  addListItem() {
    const allItem = (this.dashboardForm.get('listItem')?.value)
    const lastItem = allItem[allItem.length - 1]
    let newId: any = lastItem.id
    newId++
    const newItem = {
      id: newId,
      itemTitle: '',
      itemImg: '',
      itemDescription: ''
    }
    // const oldValues = this.dashboardForm.controls['listItem'].value
    // const updatedListItemArray: any = []
    // oldValues.map((obj: any) => {
    //   updatedListItemArray.push(this.fb.group(obj))
    // })
    // updatedListItemArray.push(this.fb.group(newItem))
    // const updateListItemArrayControl = this.fb.array(updatedListItemArray)
    // this.dashboardForm.setControl('listItem', updateListItemArrayControl)
    const listItem = this.dashboardForm.get('listItem') as FormArray
    listItem.push(this.fb.group(newItem))


  }
  getlistItem() {

  }
  removeListItem(item: any) {
    // const allItem = this.dashboardForm.get('listItem')?.value
    // if (allItem.length > 1) {
    //   const id = item.value.id
    //   console.log(id)
    //   if (id) {
    //     const updatedArray = (this.dashboardForm.get('listItem')?.value).filter((obj: any) => obj.id !== id)
    //     const updatedArrayGroup: any = []
    //     updatedArray.map((obj: any) => {
    //       updatedArrayGroup.push(this.fb.group(obj))
    //     })
    //     this.dashboardForm.setControl('listItem', this.fb.array(updatedArrayGroup))
    //   }
    // } else {
    //   this._snackBar.open("Cannot remove item, List should have at least one item", "Close", {
    //     duration: 3000
    //   });
    // }
    const listItem = this.dashboardForm.get('listItem') as FormArray
    if (listItem.length > 1) {
      listItem.removeAt(listItem.value.findIndex((obj: any) => obj.id === item.value.id))
    } else {
      this._snackBar.open("Cannot remove item, List should have at least one item", "Close", {
        duration: 3000
      });
    }
  }
  processData(form: any) {
    const {title, description, date, listItem, listTitle, mainImg} = form.value
    const formattedDate = this.formatDate(date)
    let listItemHtml = ``
    listItem.map((list:any)=>{
      listItemHtml +=
`<li>
  <span class="list-item-title">
      ${list.itemTitle}
  </span>
  <div>
      <img class="list-item-img" src="assets/png-images/blog-picture-2.jpg" alt="Image not found"/>
  </div>
  <span class="list-item-body">
      ${list.itemDescription}
  </span>
</li>` 
    })
    const html = 
`---
title: "${title}"
description: "${description}"
published: "true"
author: "KalaGato"
slug: "${title}"
image: "assets/images/Blog1.svg"
date: "${formattedDate}"
resourceType : "Blogs"
category: "Sell Your App"
tags:
    - Sell Your App
---
    
    
    
<div class="left">
    <h3 class="font-type26-primary m0">${title}</h3>
    <time class="description" datetime="${date}">${formattedDate}</time>
    <div class="blog-main-img-container">
        <img class="blog-main-image" src="assets/png-images/blog-picture-1.jpg"
            alt="Image not found">
    </div>
    <p class="description">
        ${description}
    </p>
    <p class="list-heading">
        ${listTitle}
    </p>
    <ol>
        ${listItemHtml}
    </ol>
</div>`
    this.apiService.postBlog(html).subscribe({
      next: (data)=>{
        console.log(data)
      }
    })
  }
    
}
