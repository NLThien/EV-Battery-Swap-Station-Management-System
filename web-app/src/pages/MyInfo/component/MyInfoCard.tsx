import { formatPhoneNumberLocal } from "@/utils/formatPhoneNumber";
import InfoRow from "./InfoRow";
import type { UserResponse } from "@/api/authentication/register";

type Props = {
  user: UserResponse;
};

export default function MyInfoCard({ user }: Props) {
  return (
    <div className="max-w-5xl mx-auto mt-6 bg-white shadow-md rounded-xl p-6 border border-gray-200">
      <div className="flex md:w-xl items-center gap-4 mb-4 mx-auto">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-2xl font-semibold text-blue-600">
          {user.firstName.charAt(0)}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="space-y-3">
        <InfoRow
          label="Số điện thoại"
          value={formatPhoneNumberLocal(user.phoneNumber)}
        />
        <InfoRow label="Ngày sinh" value={user.birthday} />
        <InfoRow label="Quyền" value={user.roles.join(", ")} />
      </div>
    </div>
  );
}
