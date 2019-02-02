import { Routes } from '@angular/router';
import { EatTacoComponent } from '../components/eat-taco.component';
import { NgxGuardianNavigateToRouteGuard } from '../../lib/ngx-guardian-navigate-to-route.guard';
import { EditPizzaComponent } from '../components/edit-pizza.component';

export const routes: Routes = [
    {
        path: '',
        canActivate: [NgxGuardianNavigateToRouteGuard],
        children: [
            {
                path: 'taco',
                component: EatTacoComponent
            },
            {
                path: 'pizza',
                component: EditPizzaComponent
            },
            {
                path: 'forbidden',
                component: EditPizzaComponent
            },
            {
                path: 'no-auth',
                component: EatTacoComponent
            }
        ]
    }
];
