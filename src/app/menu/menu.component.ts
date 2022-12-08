import { Component, OnInit} from '@angular/core';
import { DrawService } from '../services/draw.service';
import { faEraser,faSave,faFileUpload,faUndo,faRedo,faMousePointer,
         faSquare,faCircle,faPencilAlt,faCopy,faPaste,faCut} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
    
  constructor(public s: DrawService) {}

  ngOnInit(): void {}
  faEraser = faEraser;
  faSave = faSave;
  faFileUpload = faFileUpload;
  faUndo = faUndo;
  faRedo = faRedo;
  faMousePointer = faMousePointer;

  shapes: any[] = [{name:'square',icon:faSquare},
                   {name:'circle',icon:faCircle}, 
                   {name:'triangle',icon:faSquare},
                   {name:'line',icon:faPencilAlt}, 
                   {name:'pencil',icon:faPencilAlt}
    ];

    Edits:any[] = [{name:'copy',icon:faCopy},
                   {name:'cut',icon:faPaste},
                   {name:'paste',icon:faCut},
  ];


  asign(shape: string) {
    this.s.shape = shape;
  }

  doEdits(edit: string) {
    this.s.Edit = edit;
  }

  erase() {
    this.s.emitErase();
  }

  undo() {
    this.s.emitUndo();
  }

  redo() {
    this.s.emitRedo();
  }
  
  select(){
    this.s.sel = !this.s.sel;
    if(this.s.sel){
      this.s.select = "drawSelectBox";
    }else{
      this.s.select = "drawShape";
    }
  }
}



