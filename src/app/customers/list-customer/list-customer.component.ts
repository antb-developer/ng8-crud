import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
declare var moment: any;
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertComponent } from 'ngx-bootstrap/alert/alert.component';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {
  customers = [];
  currentCustomer : any;
  alerts: any[] = [];
  locations = {
    "AB": "Alberta",
    "BC": "British Columbia",
    "MB": "Manitoba",
    "NB": "New Brunswick",
    "NL": "Newfoundland and Labrador",
    "NT": "Northwest Territories",
    "NS": "Nova Scotia",
    "NU": "Nunavut",
    "ON": "Ontario",
    "PE": "Prince Edward Island",
    "QC": "Quebec",
    "SK": "Saskatchewan",
    "YT": "Yukon Territory"
  };
  modalRef: BsModalRef;

  constructor(private service: CustomerService, private modalService: BsModalService) { }

  ngOnInit() {
    this.list();
  }

  list() {
    this.service.get('customers').subscribe((response :any) => {
      this.customers = response;
    },
    (err : any) => {
      this.error ('Something Wrong');
    });
  }

  create() {
    let formData: FormData = new FormData();
    formData.append('firstcustomer', btoa(JSON.stringify(this.customers[0])));
    formData.append('timestamp', moment().format());
    this.service.post('customer',formData).subscribe((response :any) => {
    },
    (err : any) => {
      this.error ('Something Wrong');
    });
  }

  error (msg) {
    this.alerts.push({
      type: 'danger',
      msg: msg,
      timeout: 5000
    });
  }

  modal(i,template) {
    this.currentCustomer = this.customers[i];
    this.modalRef = this.modalService.show(template);
  }
}
