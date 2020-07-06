import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { MoviesService, ListadoGeneros, Pelicula } from '@common/services/movies';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})
export class CatalogoComponent implements OnInit {

	@ViewChild("ListaGeneros", {static: false}) GenerosDom : ElementRef;

	generos: ListadoGeneros;
	atajo_generos: any[];
	peliculas: Pelicula[];
  isLoad = false;

  constructor(
  	private moviesService: MoviesService,
  ) {}

  ngOnInit(){
  	this.peliculas = [];
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

  		this.atajo_generos = {};
  		data.forEach((el)=>{
  			this.atajo_generos["gen-"+el.id] = el.nombre;
  		});
  		this.generos.unshift(...data);
  		this.isLoad = false;
  	},
  	err => {

  		this.isLoad = false;
  	});
  }

  listarPeliculas(genero){

  	this.isLoad = true;
  	this.peliculas = [];
  	this.moviesService.listarPeliculas(genero).subscribe(data => {

  		this.peliculas = data;
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

  	this.listarPeliculas(this.generoSeleccionado);
  }

  parseDate(fecha){
  	
  	if(!fecha) return "Sin establecer";

  	let step1 = fecha.split("-");
  	return `${step1[2].split("T")[0]} de ${ this.getMonth(step1[1]) } ${ step1[0] }`;
  }

  getMonth(mes){

  	switch(mes){
  		case "01": return "enero";
  		case "02": return "febrero";
  		case "03": return "marzo";
  		case "04": return "abril";
  		case "05": return "mayo";
  		case "06": return "junio";
  		case "07": return "julio";
  		case "08": return "agosto";
  		case "09": return "septiembre";
  		case "10": return "octubre";
  		case "11": return "noviembre";
  		case "12": return "diciembre";
  	}
  }

  getGenre(generoId){
  	return this.atajo_generos["gen-"+generoId];
  }
}
