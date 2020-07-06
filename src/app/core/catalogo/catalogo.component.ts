import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { MoviesService, ListadoGeneros } from '@common/services/movies';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

	@ViewChild("ListaGeneros", {static: false}) GenerosDom : ElementRef;

	generos: ListadoGeneros;
  isLoad = false;

  constructor(
  	private moviesService: MoviesService,
  ) {}

  ngOnInit(){
  	this.listarGeneros();
  }

  listarGeneros(){

  	this.isLoad = true;
  	this.generos = [
  		{
  			id: null,
  			nombre: "Todos",
  			descripcion: "Todos los generos",
  		}
  	];
  	this.moviesService.listarGeneros().subscribe(data => {

  		this.generos.unshift(...data);
  		this.isLoad = false;
  	},
  	err => {

  		this.isLoad = false;
  	});
  }

  seleccionarGenero(item, index){

  	if(index === null){
  		index = item.id === null ? this.generos.length-1 : this.generos.findIndex((el)=> el.id === item.id);
  	}

  	let domList = this.GenerosDom.nativeElement.querySelectorAll("li");

  	for(let i = 0, j = domList.length; i<j; i++){
  		if(domList[i].classList.contains("active")){
  			domList[i].classList.remove("active");
  			break;
  		}
  	}

  	domList[index].classList.add("active");
  	this.generoSeleccionado = item.id;
  }

}
