import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private config;
    private transporter;
    constructor(config: ConfigService);
    sendCredentialsEmail(to: string, email: string, password: string, verifyLink: string): Promise<void>;
}
