import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { TranslateModule } from '@ngx-translate/core';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  declarations: [CustomersComponent, ListCustomerComponent],
  imports: [
    CommonModule,
    AlertModule,
    CustomersRoutingModule,
    TranslateModule
  ]
})
export class CustomersModule { }
