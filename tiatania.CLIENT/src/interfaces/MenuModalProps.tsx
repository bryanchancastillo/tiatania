import { MenuItem } from "./MenuItem"

export interface MenuModalProps {
    isOpen: boolean;
    toggle: () => void;
    selectedMenuItemData: MenuItem | null;
    addNewItemToMenu: (newItem: MenuItem) => void;
    addUpdatedMenuItem: (updatedItem: MenuItem) => void;
    addDeletedMenuItem: (menuIdToDelete: number) => void;
}
