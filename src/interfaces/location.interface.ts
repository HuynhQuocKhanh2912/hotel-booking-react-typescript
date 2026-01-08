export interface PagiLocation<T> {
  pageIndex: number;
  pageSize: number;
  totalRow: number;
  keywords: string | null;
  data: T;
}

export interface Location {
  id: number;
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
  hinhAnh: string;
}

export interface ProvinceItem {
  code: number;
  codename: string;
  districts: DistrictsItem[];
  division_type: string;
  name: string;
  phone_code: number;
}
export interface DistrictsItem {
  code: number;
  codename: string;
  division_type: string;
  name: string;
  province_code: number;
  wards?: null;
}

// export interface BaseCountry {
//   name: string;
//   topLevelDomain: string[];
//   alpha2Code: string;
//   alpha3Code: string;
//   callingCodes: string[];
//   capital: string;
//   altSpellings: string[];
//   subregion: string;
//   region: string;
//   population: number;
//   latlng: number[];
//   demonym: string;
//   area: number;
//   gini: number;
//   timezones: string[];
//   borders: string[];
//   nativeName: string;
//   numericCode: string;
//   flags: Flags;
//   currencies: Currency[];
//   languages: Language[];
//   translations: Translations;
//   flag: string;
//   cioc: string;
//   independent: boolean;
// }

// export interface Currency {
//   code: string;
//   name: string;
//   symbol: string;
// }

// export interface Flags {
//   svg: string;
//   png: string;
// }

// export interface Language {
//   iso639_1: string;
//   iso639_2: string;
//   name: string;
//   nativeName: string;
// }

// export interface Translations {
//   br: string;
//   pt: string;
//   nl: string;
//   hr: string;
//   fa: string;
//   de: string;
//   es: string;
//   fr: string;
//   ja: string;
//   it: string;
//   hu: string;
// }