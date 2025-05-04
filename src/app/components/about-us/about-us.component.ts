import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { NgStyle } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-about-us',
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  cards = [
    {
      title: "Comodidad",
      content: "Disfruta de la máxima comodidad en cada detalle, desde el diseño ergonómico hasta los materiales cuidadosamente seleccionados para garantizar tu bienestar.",
      img: "/img/caroussel1.jpg"

    },
    {
      title: "Al Mejor Precio",
      content: "Obtén calidad excepcional al mejor precio, asegurándote de que cada inversión valga la pena sin comprometer la excelencia.",
      img: "/img/caroussel2.jpg"
    },
    {
      title: "Lujo incomparable",
      content: "Experimenta un lujo sin igual en cada experiencia, con atención meticulosa a los detalles que hacen que cada momento sea inolvidable.",
      img: "/img/caroussel3.jpg"
    }
  ];

  showMoreInfo(index: number) {
    Swal.fire({
      title: this.cards[index].title,
      text: this.cards[index].content,
      width: '40%',
      backdrop: `
        rgba(0,0,0,0.6)
      `,
    });
  }
}
