function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b pb-2">
      <span className="text-gray-500 font-medium">{label}</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
}

export default InfoRow;
