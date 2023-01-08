export interface FileDetails {
    id: number;
    name: string;
    fileExtension: string;
    uploadDate: string;
    numberOfDownloads: number;
}

export interface FileShareDetails{
    id: number;
    name: string;
    downloadLink: string;
    downloadAvailableUntil :string;
}

