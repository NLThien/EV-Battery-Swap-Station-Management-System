import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import Button from "@/components/button";
import { useRouter } from "expo-router";

interface EVPackage {
  id: number;
  type: string;
  quantity: number;
  description: string;
  price: number;
}

const API_GATEWAY = "http://192.168.1.15:8087/api/packages";

const DriverPackagesScreen: React.FC = () => {
  const [packages, setPackages] = useState<EVPackage[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await axios.get(API_GATEWAY);
      setPackages(res.data);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách gói:", err);
    }
  };

  const onPressRent = (pkg: EVPackage) => {
    router.push({
      pathname: "../order",
      params: { packageId: pkg.id, packageName: pkg.type, price: pkg.price },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Các gói thuê pin</Text>
        {packages.length === 0 && (
          <Text style={styles.noDataText}>Không có gói thuê nào ⚡</Text>
        )}
        {packages.map((pkg) => (
          <View key={pkg.id} style={styles.packageCard}>
            <Text style={styles.packageType}>Phân loại: {pkg.type}</Text>
            <Text style={styles.packageQuantity}>Số lượng: {pkg.quantity}</Text>
            <Text style={styles.packageDescription}>Mô tả: {pkg.description}</Text>
            <Text style={styles.packagePrice}>Giá: {pkg.price.toLocaleString()} VNĐ</Text>
            <Button title="Thuê" onPress={() => onPressRent(pkg)} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noDataText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 50,
  },
  packageCard: {
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  packageType: {
    fontSize: 16,
    fontWeight: "600",
  },
  packageQuantity: {
    fontSize: 14,
    color: "#555",
    marginVertical: 3,
  },
  packageDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  packagePrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default DriverPackagesScreen;
