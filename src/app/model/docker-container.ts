export interface DockerContainer {
    Id: string;
    Names: string[];
    Image: string;
    Status: string;
    State: string;
    Ports: Port[];
    Labels: Labels;
}

export interface Port {
    PrivatePort: number;
    PublicPort: number;
    Type: string;
}

export interface Labels {
    [key: string]: string;
}