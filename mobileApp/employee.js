import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

export default function Employee() {
  const [employees, setEmployees] = useState([]);

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const token = await AsyncStorage.getItem("token"); // use AsyncStorage instead of localStorage
      const res = await axios.get("http://localhost:9000/employee", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        setEmployees(res?.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Render each employee row
  const renderEmployee = ({ item: emp }) => (
    <View className="flex-row items-center border-b border-gray-200 shadow-lg shadow-slate-400 py-3 px-2 mt-3 rounded-2xl">
      <View className="flex-1 flex-row items-center gap-2">
        <Icon name="user" size={18} color="#9ca3af" />
        <View>
          <Text className="font-medium text-gray-900">{emp.name}</Text>
          <Text className="text-xs text-gray-500">{emp.email}</Text>
        </View>
      </View>

      {/* <Text className="flex-1 text-center">{emp.department}</Text>
      <Text className="flex-1 text-center">{emp.userType}</Text> */}

      {/* <View className="flex-1 items-center">
        <Text className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs">
          Active
        </Text>
      </View> */}

      {/* <Text className="flex-1 text-center">{emp.createdAt?.split("T")[0]}</Text>
      <Text className="flex-1 text-center">{emp.salary}</Text> */}

      <View className="flex-2 mr-3 flex-row justify-center gap-4">
        <TouchableOpacity>
          <Icon name="eye" size={20} color="#3b82f6" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            
          }}
        >
          <Icon name="edit" size={20} color="#22c55e" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
           
          }}
        >
          <Icon name="trash" size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="mt-3">
      <Text className="flex-1 font-bold text-gray-700 p-2">Employee Details:</Text>

      {/* Table Header */}
      {/* <View className=" flex flex-row bg-gray-100 py-3 px-2 gap-3">
        <Text className="flex-1 font-semibold text-gray-700">Employee</Text>
        <Text className="flex-1 font-semibold text-gray-700">Department</Text>
        <Text className="flex-1 font-semibold text-gray-700">Position</Text>
        <Text className="flex-1 font-semibold text-gray-700">Status</Text>
        <Text className="flex-1 font-semibold text-gray-700">Join Date</Text>
        <Text className="flex-1 font-semibold text-gray-700">Salary</Text>
        <Text className="flex-1 font-semibold text-gray-700">Actions</Text>
      </View> */}

      {/* Table Body */}
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id || item._id}
        renderItem={renderEmployee}
      />
    </View>
  );
}