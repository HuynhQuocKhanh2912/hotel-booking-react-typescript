import Swal from "sweetalert2";

type optionalProp = {
  title?: string;
  text?: string;
  icon?: "success" | "error" | "warning" | "info" | "question";
  confirmColor?: string;
  onConfirm?: () => void; // 👉 thêm dòng này
};

export const showSwal = (optional?: optionalProp) => {
  return Swal.fire({
    title: optional?.title || "",
    text: optional?.text || "",
    icon: optional?.icon || "success",
    confirmButtonColor:
      optional?.confirmColor || optional?.icon == "error"
        ? "#dc3545"
        : "#28a745",
    confirmButtonText: "Xác nhận",
  });
};

export const showComfirmSwal = (optional: optionalProp) => {
  return Swal.fire({
    title: optional.title || "Xác nhận xoá",
    text: optional.text || "",
    icon: optional.icon || "warning",
    showCancelButton: true,
    confirmButtonText: "Có",
    cancelButtonText: "Không",
    confirmButtonColor: "#28a745",
    cancelButtonColor: "#dc3545",
  }).then((result) => {
    if (result.isConfirmed) {
      optional.onConfirm?.();
    }
  });
};
