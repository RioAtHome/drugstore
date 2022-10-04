import { Injectable } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class MaterialIconsService {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      "warehouse_logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/icons/logo-removebg-p.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "facebook_logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/icons/icons8-facebook.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "whatsapp_logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/icons/icons8-whatsapp.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "quotes",
      this.domSanitizer.bypassSecurityTrustResourceUrl("./assets/icons/quotes.svg")
    );
  }
}
