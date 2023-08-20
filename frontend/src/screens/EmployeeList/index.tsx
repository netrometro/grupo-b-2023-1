import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { api } from '../../services/api';
import { Employer } from '../../interfaces/employer';

const EmployeeList: React.FC = () => {

  return (
    <View>
      <Text>Fichas de Funcionários da Empresa</Text>
    </View>
  );
};

export default EmployeeList;
