import {ContainerFieldsBase} from '../services/container-fields';
import {NodeElementBase} from '../services/node-element';

export class NodeTreeOptions {
 id?:number;
 name?:string;
 addAble?:boolean;
 editAble?: boolean;
 title? :string;
 img?:string;
 pid?: number;
 deleteAble? :boolean;
 type?:string;

 children?:NodeTreeOptions[];
 collapse?: boolean;
 color ? : string;
 nodeTreeDescription?: string;
 content_distribution?: {
  it: {
    refresh_rate: number;
    number_of_sections: number;
    content_per_section: number;
    distribution: distributionObject[]
  }
}

}
interface distributionObject {
  percentage: number;
  speciality_id: string;
  content_class_selected: {
    curated: any;
    diseases: any;
    surgeries: any;
  }
}
export class NodeTreeConfig {
    id:number;
    color : string;
    name:string;
    title :string;
    img:string;
    pid: number;
    addAble:boolean;
    type:string;
    children:NodeTreeOptions[]=[];
    collapse: boolean ;
    nodeTreeDescription: string;
    content_distribution?: {
      it: {
        refresh_rate: number;
        number_of_sections: number;
        content_per_section: number;
        distribution: distributionObject[]
      }
    }
    editAble: boolean;
    deleteAble :boolean;
  constructor(options: NodeTreeOptions) {
    this.title = options.title || '';
    this.name = options.name || '';
    this.id = options.id;
    this.img = options.img;
    this.pid = options.pid || null;
    this.addAble =  options.addAble != null ? options.addAble :  true;
    this.editAble =  options.editAble != null ? options.editAble :  true;
    this.deleteAble =  options.deleteAble != null ? options.deleteAble :  true;
    this.children = options.children || [];
    this.collapse = options.collapse || true;
    this.color = options.color || 'black';
    this.nodeTreeDescription = options.nodeTreeDescription || '';
    this.content_distribution = options.content_distribution || null;
    this.type = options.type || '';
  }
}
