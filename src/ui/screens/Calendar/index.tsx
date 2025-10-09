import { View } from "react-native";
import { styles } from "./styles";
import { ClassList } from "@ui/components/ClassesList";
import { IClassesResponse } from "@ui/components/ClassesList/class.types";
import { AppHeader } from "@ui/components/AppHeader";

const mockClassesResponse: IClassesResponse = {
  classes: [
    {
      id: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
      title: "Jiu-Jitsu Iniciante",
      description: "Aula para iniciantes focada em fundamentos",
      date: "2025-10-09",
      startTime: "2025-10-09T22:00:00.000Z",
      endTime: "2025-10-09T23:30:00.000Z",
      capacity: 15,
      status: "finished",
      instructor: {
        id: "88faf231-b010-4f7e-b29e-90a1ad3b9c1f",
        name: "Henrique",
      },
      category: {
        id: "a1b2c3d4-e5f6-7g8h-9i0j-1k2l3m4n5o6p",
        type: "Fundamentos",
      },
      checkinsSummary: {
        total: 8,
        available: 7,
      },
    },
    {
      id: "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
      title: "Muay Thai Avançado",
      description: "Treino intenso de striking",
      date: "2025-10-09",
      startTime: "2025-10-09T23:00:00.000Z",
      endTime: "2025-10-10T00:30:00.000Z",
      capacity: 12,
      status: "finished",
      instructor: {
        id: "77eae120-a909-3e6d-a18d-89a0bc2a8e0e",
        name: "Carlos",
      },
      category: {
        id: "b2c3d4e5-f6g7-8h9i-0j1k-2l3m4n5o6p7q",
        type: "Striking",
      },
      checkinsSummary: {
        total: 10,
        available: 2,
      },
    },
    {
      id: "3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r",
      title: "Wrestling",
      description: "Técnicas de queda e controle",
      date: "2025-10-10",
      startTime: "2025-10-10T22:00:00.000Z",
      endTime: "2025-10-10T23:30:00.000Z",
      capacity: 10,
      status: "finished",
      instructor: {
        id: "66dbd019-9808-2d5c-9079-78909ab1970d",
        name: "Roberto",
      },
      category: {
        id: "c3d4e5f6-g7h8-9i0j-1k2l-3m4n5o6p7q8r",
        type: "Grappling",
      },
      checkinsSummary: {
        total: 5,
        available: 5,
      },
    },
    {
      id: "4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s",
      title: "Boxe Técnico",
      description: "Trabalho de sombra e sparring leve",
      date: "2025-10-10",
      startTime: "2025-10-10T23:30:00.000Z",
      endTime: "2025-10-11T01:00:00.000Z",
      capacity: 8,
      status: "finished",
      instructor: {
        id: "77eae120-a909-3e6d-a18d-89a0bc2a8e0e",
        name: "Carlos",
      },
      category: {
        id: "b2c3d4e5-f6g7-8h9i-0j1k-2l3m4n5o6p7q",
        type: "Striking",
      },
      checkinsSummary: {
        total: 8,
        available: 0,
      },
    },
    {
      id: "5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t",
      title: "MMA Sparring",
      description: "Treino de sparring completo",
      date: "2025-10-11",
      startTime: "2025-10-11T22:00:00.000Z",
      endTime: "2025-10-11T23:30:00.000Z",
      capacity: 10,
      status: "finished",
      instructor: {
        id: "88faf231-b010-4f7e-b29e-90a1ad3b9c1f",
        name: "Henrique",
      },
      category: {
        id: "ec1da685-c0d1-4545-8f7a-4dee1ce0964c",
        type: "Competição",
      },
      checkinsSummary: {
        total: 6,
        available: 4,
      },
    },
    {
      id: "6f7g8h9i-0j1k-2l3m-4n5o-6p7q8r9s0t1u",
      title: "Jiu-Jitsu No-Gi",
      description: "Treino sem kimono",
      date: "2025-10-11",
      startTime: "2025-10-11T23:30:00.000Z",
      endTime: "2025-10-12T01:00:00.000Z",
      capacity: 12,
      status: "finished",
      instructor: {
        id: "66dbd019-9808-2d5c-9079-78909ab1970d",
        name: "Roberto",
      },
      category: {
        id: "c3d4e5f6-g7h8-9i0j-1k2l-3m4n5o6p7q8r",
        type: "Grappling",
      },
      checkinsSummary: {
        total: 3,
        available: 9,
      },
    },
    {
      id: "7g8h9i0j-1k2l-3m4n-5o6p-7q8r9s0t1u2v",
      title: "Condicionamento Físico",
      description: "Treino funcional para lutadores",
      date: "2025-10-12",
      startTime: "2025-10-12T21:00:00.000Z",
      endTime: "2025-10-12T22:00:00.000Z",
      capacity: 20,
      status: "finished",
      instructor: {
        id: "77eae120-a909-3e6d-a18d-89a0bc2a8e0e",
        name: "Carlos",
      },
      category: {
        id: "d4e5f6g7-h8i9-0j1k-2l3m-4n5o6p7q8r9s",
        type: "Condicionamento",
      },
      checkinsSummary: {
        total: 15,
        available: 5,
      },
    },
    {
      id: "8h9i0j1k-2l3m-4n5o-6p7q-8r9s0t1u2v3w",
      title: "Jiu-Jitsu Avançado",
      description: "Técnicas avançadas e transições",
      date: "2025-10-12",
      startTime: "2025-10-12T22:30:00.000Z",
      endTime: "2025-10-13T00:00:00.000Z",
      capacity: 10,
      status: "finished",
      instructor: {
        id: "88faf231-b010-4f7e-b29e-90a1ad3b9c1f",
        name: "Henrique",
      },
      category: {
        id: "a1b2c3d4-e5f6-7g8h-9i0j-1k2l3m4n5o6p",
        type: "Fundamentos",
      },
      checkinsSummary: {
        total: 9,
        available: 1,
      },
    },
    {
      id: "9i0j1k2l-3m4n-5o6p-7q8r-9s0t1u2v3w4x",
      title: "Open Mat - Treino Livre",
      description: "Treino aberto para todos os níveis",
      date: "2025-10-13",
      startTime: "2025-10-13T20:00:00.000Z",
      endTime: "2025-10-13T22:00:00.000Z",
      capacity: 25,
      status: "finished",
      instructor: {
        id: "66dbd019-9808-2d5c-9079-78909ab1970d",
        name: "Roberto",
      },
      category: {
        id: "c3d4e5f6-g7h8-9i0j-1k2l-3m4n5o6p7q8r",
        type: "Grappling",
      },
      checkinsSummary: {
        total: 12,
        available: 13,
      },
    },
    {
      id: "0j1k2l3m-4n5o-6p7q-8r9s-0t1u2v3w4x5y",
      title: "Muay Thai Iniciante",
      description: "Fundamentos de Muay Thai",
      date: "2025-10-13",
      startTime: "2025-10-13T22:00:00.000Z",
      endTime: "2025-10-13T23:30:00.000Z",
      capacity: 15,
      status: "finished",
      instructor: {
        id: "77eae120-a909-3e6d-a18d-89a0bc2a8e0e",
        name: "Carlos",
      },
      category: {
        id: "b2c3d4e5-f6g7-8h9i-0j1k-2l3m4n5o6p7q",
        type: "Striking",
      },
      checkinsSummary: {
        total: 11,
        available: 4,
      },
    },
  ],
  pagination: {
    hasMore: false,
    nextCursor: null,
    total: 10,
  },
};

export function CalendarScreen() {
  return (
    <View style={styles.container}>
      <AppHeader />
      <ClassList response={mockClassesResponse} />
    </View>
  );
}
