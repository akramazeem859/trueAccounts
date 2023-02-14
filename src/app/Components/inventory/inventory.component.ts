import { Component, OnInit } from '@angular/core';
import { Inventory } from 'src/app/Models/inventory.model';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {


  Inventory$ : Inventory [] = [];

  /**
   *
   */
  constructor(private sevices: CompanyService) { }

  ngOnInit(): void {
    this.sevices.getAllInventory().subscribe({
      next : (inv) => {
        this.Inventory$ = inv;
        console.log(this.Inventory$);
      }
    })
  }

}
