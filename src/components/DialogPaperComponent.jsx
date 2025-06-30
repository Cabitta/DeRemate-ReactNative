import { Button, Dialog, Portal, Text } from "react-native-paper";

const DialogPaperComponent = ({
  visible,
  onCancel,
  onAccept,
  title,
  children,
  textOnAccept = "Aceptar",
  textOnCancel = "Cancelar",
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          {children || <Text>No content provided</Text>}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancel}> {textOnCancel} </Button>
          <Button onPress={onAccept}>{textOnAccept}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogPaperComponent;
