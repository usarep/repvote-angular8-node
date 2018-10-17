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
}
