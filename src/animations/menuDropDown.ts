import { trigger, style, animate, transition } from '@angular/animations';

export const menuDropDownAnimation =
trigger('menuDropDown', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(-100%)'
    }),
    animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)',
      style({
        opacity: 1,
        transform: 'none'
      })
    )
  ]),
  transition(':leave', [
    animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)',
      style({
        opacity: 0,
        transform: 'translateY(-100%)'
      })
    )
  ])
])