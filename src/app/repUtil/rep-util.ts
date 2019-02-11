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

  static computeName(rep: Rep) : string {
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
}
