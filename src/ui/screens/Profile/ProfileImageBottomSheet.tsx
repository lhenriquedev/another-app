import React, { useImperativeHandle, useRef, useState } from "react";

import { ISignInBottomSheet } from "../../components/SignInBottomSheet/ISignInBottomSheet";

import { useUploadAvatar } from "@app/hooks/useUploadAvatar";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { AppText } from "@ui/components/AppText";
import { Button } from "@ui/components/Button";
import { theme } from "@ui/styles/theme";
import { isAxiosError } from "axios";
import {
  launchImageLibraryAsync,
  useCameraPermissions,
} from "expo-image-picker";
import { Image, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { toast } from "sonner-native";

interface IProfileImageBottomSheetProps {
  ref: React.Ref<ISignInBottomSheet>;
}

type SelectedImage = {
  uri: string;
  fileName: string;
  type: string;
};

export function ProfileImageBottomSheet({
  ref,
}: IProfileImageBottomSheetProps) {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(
    null
  );

  const [permission, requestPermission] = useCameraPermissions();
  const { mutateAsync, isPending, uploadProgress } = useUploadAvatar();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeAreaInsets();

  useImperativeHandle(
    ref,
    () => ({
      open: () => bottomSheetModalRef.current?.present(),
    }),
    []
  );

  const handleSelectImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      setSelectedImage({
        uri: asset.uri,
        fileName: asset.fileName || `avatar-${Date.now()}.jpg`,
        type: asset.mimeType || "image/jpeg",
      });
    }
  };

  const handleClearSelection = () => {
    setSelectedImage(null);
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    try {
      await mutateAsync(selectedImage);
      toast.success("Avatar atualizado com sucesso!");
      bottomSheetModalRef.current?.dismiss();
      setSelectedImage(null);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Erro ao fazer upload da imagem"
        );
      } else {
        toast.error("Erro ao fazer upload da imagem");
      }
    }
  };

  if (!permission) return null;

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      backgroundStyle={{ backgroundColor: theme.colors.card }}
      handleIndicatorStyle={{ backgroundColor: theme.colors.mutedText }}
      enablePanDownToClose={!isPending}
    >
      <BottomSheetView
        style={[bottomSheetStyles.container, { paddingBottom: bottom + 16 }]}
      >
        <AppText
          size="xl"
          weight="semiBold"
          color={theme.colors.text}
          style={bottomSheetStyles.title}
        >
          Alterar foto de perfil
        </AppText>

        {!permission.granted && (
          <View style={bottomSheetStyles.permissionContainer}>
            <AppText
              color={theme.colors.mutedText}
              style={bottomSheetStyles.permissionText}
            >
              Precisamos de permissão para acessar a galeria!
            </AppText>
            <Button variant="primary" onPress={requestPermission}>
              Dar permissão
            </Button>
          </View>
        )}

        {permission.granted && !selectedImage && (
          <View style={bottomSheetStyles.selectContainer}>
            <Button variant="primary" onPress={handleSelectImage}>
              Escolher imagem da galeria
            </Button>
          </View>
        )}

        {selectedImage && (
          <View style={bottomSheetStyles.previewContainer}>
            <Image
              style={bottomSheetStyles.previewImage}
              source={{ uri: selectedImage.uri }}
            />

            {isPending && (
              <View style={bottomSheetStyles.progressContainer}>
                <View style={bottomSheetStyles.progressBar}>
                  <View
                    style={[
                      bottomSheetStyles.progressFill,
                      { width: `${uploadProgress}%` },
                    ]}
                  />
                </View>
                <AppText
                  size="sm"
                  color={theme.colors.mutedText}
                  style={bottomSheetStyles.progressText}
                >
                  {uploadProgress}%
                </AppText>
              </View>
            )}

            <View style={bottomSheetStyles.actionsContainer}>
              <Button
                variant="primary"
                onPress={handleUpload}
                disabled={isPending}
                loading={isPending}
                style={bottomSheetStyles.actionButton}
              >
                Enviar
              </Button>
              <Button
                variant="danger"
                onPress={handleClearSelection}
                disabled={isPending}
              >
                Cancelar
              </Button>
            </View>
          </View>
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const bottomSheetStyles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 20,
  },
  title: {
    textAlign: "center",
  },
  permissionContainer: {
    gap: 16,
  },
  permissionText: {
    textAlign: "center",
  },
  selectContainer: {
    gap: 12,
  },
  previewContainer: {
    gap: 20,
    alignItems: "center",
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  progressContainer: {
    width: "100%",
    gap: 8,
  },
  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  progressText: {
    textAlign: "center",
  },
  actionsContainer: {
    width: "100%",
    gap: 12,
  },
  actionButton: {
    width: "100%",
  },
});
