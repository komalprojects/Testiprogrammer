import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PhotoService } from './photo.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {
  Photodata:any;
  editdata:any;
  falg:boolean;
  rflag:boolean;
  imageUrl: string | ArrayBuffer;
  constructor(private photoserv:PhotoService) { 
this.editdata={}
 if(this.editdata==null|| this.editdata==undefined){
   this.falg=true
   this.rflag=false
 }
  }

  dataSource = new MatTableDataSource<any[]>();
   @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;


  displayedColumns: string[] = ['photo','id', 'url','title','action'];
  ngOnInit(): void {
   this.photoserv.getdata().subscribe(res=>{
     this.Photodata=res
     this.dataSource = new MatTableDataSource(this.Photodata);
   })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
editdta(id)
{
  this.falg=false
   this.rflag=true
  this.photoserv.getelementdata(id).subscribe(res=>{
  this.editdata=res;
  })
}
uploadFile(event) {
  let reader = new FileReader(); // HTML5 FileReader API
  let file = event.target.files[0];
  if (event.target.files && event.target.files[0]) {
    reader.readAsDataURL(file);

    // When file uploads set it to file formcontrol
    reader.onload = () => {
      this.imageUrl = reader.result;

      this.editdata.thumbnailUrl=this.imageUrl
      // this.editFile = false;
      // this.removeUpload = true;
    }
    
  }
}

  deletephoto(id){
    this.Photodata.splice(this.Photodata.indexOf(id), 1);
    console.log(this.dataSource)
    this.dataSource = this.Photodata ;

    this.dataSource = this.Photodata.filter((value,key)=>{
      return value.id != id.id;
    });
  
  }

  onSubmit(from:NgForm){
   this.photoserv.postdata(from.value).subscribe(res=>{
     
   })
  }

}
