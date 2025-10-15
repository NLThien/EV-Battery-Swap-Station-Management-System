import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import UserAvatar from "../../../../components/user-avatar";
import { Pressable } from "react-native";

const UserProfile = () => {
  const { id } = useLocalSearchParams();
  const [user, setUser] = useState<any>({
    name: "",
    email: "",
    phone: "",
    address: "",
    cccd: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 📥 Lấy thông tin user từ gateway
useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/users/${id}`);
      if (!res.ok) throw new Error("Không thể tải thông tin người dùng");
      const data = await res.json();
      setUser(data);
    } catch (err: any) {
      console.error("Lỗi khi tải dữ liệu:", err);
      setError("Không thể tải thông tin người dùng, đang dùng dữ liệu mẫu để test.");

      // Dữ liệu mẫu
      setUser({
        name: "Hoàng Văn A",
        email: "vana@example.com",
        phone: "0123456789",
        address: "123 Đường ABC, Quận 1, TP.HCM",
        cccd: "123456789012",
      });
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, [id]);

  // 📤 Gửi yêu cầu cập nhật
  const handleUpdate = async () => {
    try {
      setUpdating(true);
      const res = await fetch(`http://localhost:8080/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!res.ok) throw new Error("Cập nhật thất bại");
      Alert.alert("✅ Thành công", "Cập nhật thông tin người dùng thành công!");
    } catch (err) {
      console.error("Update Error:", err);
      Alert.alert("❌ Lỗi", "Không thể cập nhật thông tin người dùng");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#8e7a6b" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {error && <Text style={styles.errorText}>⚠️ {error}</Text>}

      {/* Avatar */}
      <View style={styles.avatarWrapper}>
        {user?.avatar ? (
          <UserAvatar name={user.name} size={120} backgroundColor="#ccc" />
        ) : (
          <UserAvatar name={user?.name || "?"} size={120} />
        )}
      </View>

      {/* Form thông tin */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Họ và tên</Text>
        <TextInput
          style={styles.input}
          value={user.name}
          onChangeText={(text) => setUser({ ...user, name: text })}
          placeholder="Nhập họ và tên"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={user.email}
          onChangeText={(text) => setUser({ ...user, email: text })}
          placeholder="Nhập email"
        />

        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.input}
          value={user.phone}
          onChangeText={(text) => setUser({ ...user, phone: text })}
          placeholder="Nhập số điện thoại"
        />

        <Text style={styles.label}>Địa chỉ</Text>
        <TextInput
          style={styles.input}
          value={user.address}
          onChangeText={(text) => setUser({ ...user, address: text })}
          placeholder="Nhập địa chỉ"
        />

        <Text style={styles.label}>CCCD</Text>
        <TextInput
          style={styles.input}
          value={user.cccd}
          onChangeText={(text) => setUser({ ...user, cccd: text })}
          placeholder="Nhập CCCD"
        />
      </View>

      {/* Nút cập nhật */}
      <Pressable
        onPress={handleUpdate}
        disabled={updating}
        style={[
          styles.button,
          { backgroundColor: updating ? "#aaa" : "#8e7a6b" },
        ]}
      >
        <Text style={styles.buttonText}>
          {updating ? "Đang cập nhật..." : "Cập nhật thông tin"}
        </Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarWrapper: {
    marginVertical: 15,
  },
  infoContainer: {
    width: "100%",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 18,
    color: "#0b0b0bff",
    marginTop: 12,
    fontWeight: "bold",
    marginBottom: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 25,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 19,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 5,
  },
});

export default UserProfile;
