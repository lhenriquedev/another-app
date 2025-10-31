import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { EmptyState } from "../EmptyState";
import {
  CalendarEmptyIcon,
  SearchEmptyIcon,
  FilterEmptyIcon,
  ErrorIcon,
} from "../EmptyStateIcons";
import { AppText } from "../AppText";
import { theme } from "@ui/styles/theme";

interface EmptyStateProps {
  onRetry?: () => void;
  onClearFilters?: () => void;
}

// Sem aulas no dia selecionado
export function NoClassesEmptyState() {
  return (
    <EmptyState
      icon={<CalendarEmptyIcon />}
      title="Nenhuma aula disponível"
      description="Não há aulas agendadas para esta data. Tente selecionar outro dia no calendário."
    />
  );
}

// Sem resultados com filtros aplicados
export function NoResultsEmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <EmptyState
      icon={<FilterEmptyIcon />}
      title="Nenhum resultado encontrado"
      description="Não encontramos aulas com os filtros selecionados. Tente ajustar seus critérios de busca."
      action={
        onClearFilters && (
          <TouchableOpacity
            style={styles.button}
            onPress={onClearFilters}
            activeOpacity={0.7}
          >
            <AppText
              size="sm"
              weight="semiBold"
              color={theme.colors.background}
            >
              Limpar Filtros
            </AppText>
          </TouchableOpacity>
        )
      }
    />
  );
}

// Erro ao carregar
export function ErrorEmptyState({ onRetry }: EmptyStateProps) {
  return (
    <EmptyState
      icon={<ErrorIcon />}
      title="Algo deu errado"
      description="Não conseguimos carregar as aulas. Verifique sua conexão e tente novamente."
      action={
        onRetry && (
          <TouchableOpacity
            style={styles.button}
            onPress={onRetry}
            activeOpacity={0.7}
          >
            <AppText
              size="sm"
              weight="semiBold"
              color={theme.colors.background}
            >
              Tentar Novamente
            </AppText>
          </TouchableOpacity>
        )
      }
    />
  );
}

// Busca sem resultados
export function SearchEmptyState() {
  return (
    <EmptyState
      icon={<SearchEmptyIcon />}
      title="Nenhuma aula encontrada"
      description="Sua busca não retornou resultados. Tente usar outros termos ou ajustar os filtros."
    />
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
