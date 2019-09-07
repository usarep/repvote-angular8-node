import { Rep } from "../repModel/rep.model";
import { isNull } from "@angular/compiler/src/output/output_ast";

export class RepUtil {

  static normalizeRepName(repName: string): string {
    // graham(sc) -> graham (SC)
    if (repName && repName.indexOf('(') >= 1) {
      let i = repName.indexOf('(');
      let j = repName.indexOf(')');
      if (j > i + 2) {
        const name = repName.substring(0, i);
        const state = repName.substring(i + 1, j);
        return name + "(" + state + ")";
      }
      else {
        return repName;
      }


    }
    else {
      return repName;
    }

  }

  static initSeo(rep: Rep): void{

    if (!rep.seoName) {
      rep.seoName = RepUtil.computeSeoName(rep);
    }

    if (!rep.seoNameId) {
      rep.seoNameId = RepUtil.computeSeoNameId(rep);
    }
  }

  static computeName(rep: Rep): string {
    if (!rep) {
      return null;
    }

    let result = null;

    // check rep.legislator.name fields
    if (rep.legislator && rep.legislator.name) {
      // officialFull
      if (rep.legislator.name.officialFull) {
        result = rep.legislator.name.officialFull;
      }
      else if (rep.legislator.name.last && rep.legislator.name.first) {
        result = rep.legislator.name.first + " " + rep.legislator.name.last;
      }

    }

    // replace ? with ' -- as in O?Rourke to O'Rourke
    if (result && result.indexOf('?') >= 0) {
      result = result.replace(/\?/i, "'"); // single quote in result
    }

    // default when all else fails
    return result;

  }


  // this is the stuff to be added to 1-id@seoName or 2-id@seoName
  static computeSeoName(rep: Rep): string {
    if (!rep) {
      return null;
    }

    let result = RepUtil.computeName(rep);

    // if no name found, see if there is a label
    if (!result) {
      result = rep.label;
    }

    if (!result) {
      // nothing found
      return result;
    }

    // replace non word chars with -
    const normalized = result.replace(/\W+/g, '-').toLowerCase();
    console.log("name=", result, "normalized=", normalized);

    return normalized;

  }

  static computeSeoNameId(rep: Rep): string {
    const result = rep.value + "@" + RepUtil.computeSeoName(rep);
    return result;
  }

  static removeSeoNames(csvSeoNameIds) {
    // each is a repId + @ + seoName
    // comma separated
    // so remove everything between @ and [,|$]
    // let result = csvSeoNameIds.replace(/\@^[,|$]*[,|$]/g, '');

    const arr = csvSeoNameIds.split(",");

    let result = "";
    for (let i = 0; i < arr.length; i++) {
      if (i > 0) {
        result += ",";
      }
      result += RepUtil.removeSeoName(arr[i]);

    }

    console.log("csvSeoNameIds=", csvSeoNameIds, " cleaned=", result);
    return result;
  }

  static removeSeoName(csvSeoNameId) {

    if (!csvSeoNameId) {
      return csvSeoNameId;
    }

    const atIndex = csvSeoNameId.indexOf("@");
    if (atIndex > 0) {
      return csvSeoNameId.substring(0, atIndex);
    } else {
      return csvSeoNameId;
    }
  }

}
