import { Component, OnInit } from '@angular/core';
import { Inventory } from 'src/app/Models/inventory.model';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'app-inventorylist',
  templateUrl: './inventorylist.component.html',
  styleUrls: ['./inventorylist.component.css']
})
export class InventorylistComponent implements OnInit {


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
