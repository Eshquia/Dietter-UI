import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { ClientComponent } from 'app/client/client.component';
import { FoodComponent } from 'app/food/food.component';
import { ListComponent } from 'app/list/list.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',     component: HomeComponent },
    { path: 'client',        component: ClientComponent },
    { path: 'food',          component:FoodComponent },
    { path: 'list',          component:ListComponent }
];
     