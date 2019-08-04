export interface IMountpoints{
    path: string;
}
export interface IDriveList{
    enumerator: string,
    busType: string,
    busVersion:string,
    device: string,
    devicePath: string,
    raw: string,
    description: string,
    error: string,
    size: number,
    blockSize: number,
    logicalBlockSize:number,
    mountpoints: IMountpoints[],
    isReadOnly: boolean,
    isSystem: boolean,
    isVirtual: boolean,
    isRemovable: boolean,
    isCard: boolean,
    isSCSI: boolean,
    isUSB: boolean,
    isUAS: boolean
}