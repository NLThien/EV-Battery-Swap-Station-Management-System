export function formatBirthdayToApi(dateString: string): string {
  // dateString dạng dd/mm/yyyy hoặc dd-mm-yyyy
  const parts = dateString.replace(/[/\-]/g, "-").split("-");

  if (parts.length !== 3) return ""; // tránh lỗi

  const [dd, mm, yyyy] = parts;

  // Trả về yyyy-MM-dd
  return `${yyyy}-${mm}-${dd}`;
}
export function formatBirthdayToUI(apiDate: string): string {
  if (!apiDate) return "";

  const [yyyy, mm, dd] = apiDate.split("-");

  if (!yyyy || !mm || !dd) return "";

  return `${dd}/${mm}/${yyyy}`;
}
