import { Rep } from "src/app/repModel/rep.model";
import { RepUtil } from "src/app/repUtil/rep-util";
import { UrlService } from "src/app/repService/url.service";

export class BaseRepPhotoName {

  repName: string; // cached name

  constructor(public urlService: UrlService) {}

  public getPhotoUrl(rep) {

    const repPhotoUrl = this.urlService.getRepPhotoUrl(rep.legislator.id.bioguide);
    return repPhotoUrl;

  }

  public computeName(rep: Rep): string {
    if (!rep) {
      return null;
    }
    else {
      const name = RepUtil.computeName(rep);
      if (name) {
        return name;
      }
      else {
        return rep.label;
      }
    }
  }

}
