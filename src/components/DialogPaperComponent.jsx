import { Button, Dialog, Portal, Text } from "react-native-paper";

const DialogPaperComponent = ({
  visible,
  onCancel,
  onAccept,
  title,
  children,
}) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onCancel}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          {children || <Text>No content provided</Text>}
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onCancel}> Cancelar</Button>
          <Button onPress={onAccept}>Aceptar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default DialogPaperComponent;
