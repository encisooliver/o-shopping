import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: 'buyertabs.page.html',
  styleUrls: ['buyertabs.page.scss']
})
export class BuyerTabsPage implements OnInit {

  constructor(private route: ActivatedRoute) {  }

  ngOnInit() {

  }


}
