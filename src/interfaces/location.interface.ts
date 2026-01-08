export interface PagiLocation<T> {
  pageIndex: number;
  pageSize:  number;
  totalRow:  number;
  keywords:  string | null;
  data:      T;
}

export interface Location {
  id: number;
  tenViTri: string;
  tinhThanh: string;
  quocGia: string;
  hinhAnh: string;
}

