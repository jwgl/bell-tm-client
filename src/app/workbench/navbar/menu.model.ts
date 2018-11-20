export interface Menu {
    id: string;
    label: string;
    display_order: number;
    children: (Menu | MenuItem)[];
}

export interface MenuItem {
    id: string;
    label: string;
    url: string;
    display_order: number;
}

export function isMenu(obj: Menu | MenuItem): obj is Menu {
    return (<Menu>obj).children !== undefined;
}
