import { NgModule } from '@angular/core';

import { DashboardRoutingModule, routedComponents } from './dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [DashboardRoutingModule, SharedModule],
  declarations: [routedComponents]
})
export class DashboardModule { }
