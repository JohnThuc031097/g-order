import { GoogleSpreadsheet } from "google-spreadsheet";
import { serviceAccountAuth } from "../auth/auth-google-sheet"

const sheetID = "1g6hwY8RYjoZkGtkzWKVvCSFx9gYmDoP5osxT77uE8Xg"

const sheet = new GoogleSpreadsheet(sheetID, serviceAccountAuth);

export const testLoadDataFromGgSheet = async () => {
  await sheet.loadInfo();
  console.log(sheet.title);
};

export const testNoPromise = () => {

}

